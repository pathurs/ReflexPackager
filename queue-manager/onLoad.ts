import { FunctionItem } from '../source';
import { QueueManagerClient, QueueManagerQueueSubscriber, QueueManagerQueueType, QueueManagerQueueSubscription, QueueManagerQueuedCommand } from './queue-manager';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';

declare const client: QueueManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.queuemanager = {
            settings: {
                enabled: true,
                gag: true
            },
            free: {
                queue: []
            },
            balance: {
                queue: []
            },
            equilibrium: {
                queue: []
            },
            equilibriumBalance: {
                queue: []
            },
            class: {
                queue: []
            },
            ship: {
                queue: []
            },
            sendingQueue: false,
            subscriptions: [],
            subscribe<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>) {
                const subscription = {
                    queues,
                    subscriber
                };

                client.queuemanager.subscriptions.push(<QueueManagerQueueSubscription<QueueManagerQueueType>><unknown>subscription);

                return subscription;
            },
            unsubscribe(subscription) {
                const index = client.queuemanager.subscriptions.findIndex(value => value === subscription);

                client.queuemanager.subscriptions.splice(index, 1);
            },
            once<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>) {
                const subscription = client.queuemanager.subscribe(queues, function (queue, method, commands) {
                    subscriber(queue, method, commands);

                    client.queuemanager.unsubscribe(<QueueManagerQueueSubscription<QueueManagerQueueType>><unknown>subscription);
                });

                return subscription;
            },
            emit(queueType, method, args) {
                client.queuemanager.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes(queueType)) {
                        subscription.subscriber(queueType, method, args);
                    }
                });
            },
            parseCommand(queueType, command) {
                const lowerCommand = command.trim().toLowerCase();

                const queueManagerRegExp = /^queuemanager([1-9])/;

                if (!queueManagerRegExp.test(lowerCommand)) {
                    return [];
                }

                const [, countText] = (lowerCommand.match(queueManagerRegExp) || []);
                const count = Number(countText);

                const argumentRegExp = /{([\w\W]*?)}/g;
                const commands: string[] = [];
                let matches: RegExpExecArray | null = null;

                while (matches = argumentRegExp.exec(lowerCommand)) {
                    commands.push(matches[1]);
                }

                if (commands.length !== count) {
                    throw new Error(`Unexpected amount of commands in queued commands. Expected: '${count}' Actual: '${commands.length}' Queue: '${queueType}' Full Command: '${command}'`);
                }

                const queue = client.queuemanager.getQueue(queueType);
                const result: QueueManagerQueuedCommand[] = [];

                for (let i = 0; i < commands.length; i++) {
                    if (queue[i].command.trim().toLowerCase() !== commands[i].trim().toLowerCase()) {
                        throw new Error(`Unexpected command in queue. Expected: '${queue[i].command}' Actual: '${commands[i]}' Queue: '${queueType}' Full Command: '${command}'`);
                    }

                    result.push(queue[i]);
                }

                return result;
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%Queue Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.queuemanager.echo(`%red%${text}`);
            },
            noraliseQueueType(type) {
                switch (type.toLowerCase()) {
                    case 'b':
                    case 'bal':
                    case 'balance':
                        return 'balance';

                    case 'e':
                    case 'eq':
                    case 'equilibrium':
                        return 'equilibrium';

                    case 'eb':
                    case 'eqbal':
                    case 'equilibriumBalance':
                        return 'equilibriumBalance';

                    case 'c':
                    case 'class':
                    case 'class specific':
                    case 'class balance':
                        return 'class';

                    case 's':
                    case 'ship':
                        return 'ship';

                    default:
                        return undefined;
                }
            },
            // parseQueueTypeInteractions(interactions) {
            //     if (!interactions) {
            //         return 'free';
            //     }

            //     if ('class' in interactions && interactions.class) {
            //         return 'class';
            //     }
            //     else if ('ship' in interactions && interactions.ship) {
            //         return 'ship';
            //     }
            //     if ('bal' in interactions || 'eq' in interactions) {
            //         if (interactions.bal && !interactions.eq) {
            //             return 'balance';
            //         }
            //         else if (!interactions.bal && interactions.eq) {
            //             return 'equilibrium';
            //         }
            //         else if (interactions.bal && interactions.eq) {
            //             return 'equilibriumBalance';
            //         }
            //     }

            //     return 'free';
            // },
            getQueue(type) {
                switch (type) {
                    case 'free':
                        return client.queuemanager.free.queue;

                    case 'balance':
                        return client.queuemanager.balance.queue;

                    case 'equilibrium':
                        return client.queuemanager.equilibrium.queue;

                    case 'equilibriumBalance':
                        return client.queuemanager.equilibriumBalance.queue;

                    case 'class':
                        return client.queuemanager.class.queue;

                    case 'ship':
                        return client.queuemanager.ship.queue;
                }
            },
            appendCommand(command, requires = 'free', consumes = 'free') {
                const queueType = requires;

                const queuedCommand: QueueManagerQueuedCommand = {
                    queue: queueType,
                    command,
                    requires,
                    consumes
                };

                const queue = client.queuemanager.getQueue(queueType);

                queue.push(queuedCommand);

                client.queuemanager.sendQueue(queueType);

                return queuedCommand;
            },
            prependCommand(command, requires = 'free', consumes = 'free') {
                const queueType = requires;

                const queuedCommand: QueueManagerQueuedCommand = {
                    queue: queueType,
                    command,
                    requires,
                    consumes
                };

                const queue = client.queuemanager.getQueue(queueType);

                queue.unshift(queuedCommand);

                client.queuemanager.sendQueue(queueType);

                return queuedCommand;
            },
            // replaceCommand(_queueType, index, command, requires, _consumes) {
            //     const queueType = client.queuemanager.parseQueueTypeInteractions(requires);

            //     const queuedCommand: QueueManagerQueuedCommand = {
            //         queue: queueType,
            //         command
            //     };

            //     const queue = client.queuemanager.getQueue(queueType);

            //     let constrainedIndex = index;

            //     if (constrainedIndex < 0) {
            //         constrainedIndex = 0;
            //     }
            //     else if (constrainedIndex > queue.length) {
            //         constrainedIndex = queue.length;
            //     }

            //     queue.splice(constrainedIndex, 1, queuedCommand);

            //     return queuedCommand;
            // },
            // insertCommand(type, index, command, _requires, _consumes) {
            //     const queuedCommand: QueueManagerQueuedCommand = {
            //         queue: type,
            //         command
            //     };

            //     const queue = client.queuemanager.getQueue(type);

            //     let constrainedIndex = index;

            //     if (constrainedIndex < 0) {
            //         constrainedIndex = 0;
            //     }
            //     else if (constrainedIndex > queue.length) {
            //         constrainedIndex = queue.length;
            //     }

            //     queue.splice(constrainedIndex, 0, queuedCommand);

            //     return queuedCommand;
            // },
            removeCommand(type, index) {
                const queue = client.queuemanager.getQueue(type);

                let constrainedIndex = index;

                if (constrainedIndex < 0) {
                    constrainedIndex = 0;
                }
                else if (constrainedIndex > queue.length) {
                    constrainedIndex = queue.length;
                }

                queue.splice(constrainedIndex, 1);

                client.queuemanager.sendQueue(type);
            },
            clearQueue(type) {
                const queue = client.queuemanager.getQueue(type);

                queue.splice(0, queue.length);
            },
            sendQueue(type) {
                if (client.queuemanager.sendingQueue) {
                    return;
                }

                client.queuemanager.sendingQueue = true;

                setTimeout(() => {
                    client.queuemanager.sendingQueue = false;

                    let queueShortName: string | undefined;

                    switch (type) {
                        case 'free':
                            if (client.queuemanager.free.queue.length > 0) {
                                client.systemservice.sendCommands(client.queuemanager.free.queue.map(value => value.command));

                                client.queuemanager.clearQueue('free');
                            }
                            break;

                        case 'balance':
                            queueShortName = 'bal';
                            break;

                        case 'equilibrium':
                            queueShortName = 'eq';
                            break;

                        case 'equilibriumBalance':
                            queueShortName = 'eqbal';
                            break;

                        case 'class':
                            queueShortName = 'class';
                            break;

                        case 'ship':
                            queueShortName = 'ship';
                            break;
                    }

                    if (!queueShortName) {
                        return;
                    }

                    const queue = client.queuemanager.getQueue(type);

                    client.systemservice.sendCommand(`clearqueue ${queueShortName}`);

                    if (queue.length > 0) {
                        const commands: string[] = [];
                        const length = Math.min(queue.length, 9);

                        for (let i = 0; i < length; i++) {
                            const command = queue[i];

                            commands.push(command.command);

                            if (command.consumes !== 'free') {
                                break;
                            }
                        }

                        const expectedCommandArguments = commands.map(command => `{${command}}`).join(' ');

                        const expectedCommand = `queuemanager${commands.length} ${expectedCommandArguments}`;

                        client.queuemanager.balance.expected = expectedCommand
                        client.systemservice.sendCommand(`queue add ${queueShortName} ${expectedCommand}`);
                    }
                });
            }
        };

        client.systemservice.sendCommands(
            new Array(9).fill('').map((_value, count) => {
                return `alias set queuemanager${count + 1} ${new Array(count + 1).fill('').map((_value, index) => `%${index + 1}`).join('/')}`;
            })
        );

        client.queuemanager.echo('Loaded.');
    }
);
