import { FunctionItem } from '../source';
import { QueueManagerClient, QueueManagerQueueSubscriber, QueueManagerQueueType, QueueManagerQueueSubscription, QueueManagerQueuedCommand } from './queue-manager';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';

declare const client: QueueManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.queueManager = {
            settings: client.systemService.defaultsDeep({
                enabled: true,
                gag: true
            }),
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
            queuesToSend: new Set(),
            subscriptions: [],
            subscribe<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>) {
                const subscription = {
                    queues,
                    subscriber
                };

                client.queueManager.subscriptions.push(<QueueManagerQueueSubscription<QueueManagerQueueType>><unknown>subscription);

                return subscription;
            },
            unsubscribe(subscription) {
                const index = client.queueManager.subscriptions.findIndex(value => value === subscription);

                client.queueManager.subscriptions.splice(index, 1);
            },
            once<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>) {
                const subscription = client.queueManager.subscribe(queues, function (queue, method, commands) {
                    subscriber(queue, method, commands);

                    client.queueManager.unsubscribe(<QueueManagerQueueSubscription<QueueManagerQueueType>><unknown>subscription);
                });

                return subscription;
            },
            emit(queueType, method, args) {
                client.queueManager.subscriptions.forEach(subscription => {
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

                const queue = client.queueManager.getQueue(queueType);
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
                client.displayService.echo(`%lightgray%[%deepskyblue%Queue Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.queueManager.echo(`%red%${text}%end%`);
            },
            noraliseQueueType(queueType) {
                switch (queueType.toLowerCase()) {
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
            getQueue(queueType) {
                switch (queueType) {
                    case 'free':
                        return client.queueManager.free.queue;

                    case 'balance':
                        return client.queueManager.balance.queue;

                    case 'equilibrium':
                        return client.queueManager.equilibrium.queue;

                    case 'equilibriumBalance':
                        return client.queueManager.equilibriumBalance.queue;

                    case 'class':
                        return client.queueManager.class.queue;

                    case 'ship':
                        return client.queueManager.ship.queue;
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

                const queue = client.queueManager.getQueue(queueType);

                queue.push(queuedCommand);

                client.queueManager.sendQueue(queueType);

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

                const queue = client.queueManager.getQueue(queueType);

                queue.unshift(queuedCommand);

                client.queueManager.sendQueue(queueType);

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
            // insertCommand(queueType, index, command, _requires, _consumes) {
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

            //     queue.splice(constrainedIndex, 0, queuedCommand);

            //     return queuedCommand;
            // },
            removeCommand(queueType, index) {
                const queue = client.queueManager.getQueue(queueType);

                let constrainedIndex = index;

                if (constrainedIndex < 0) {
                    constrainedIndex = 0;
                }
                else if (constrainedIndex > queue.length) {
                    constrainedIndex = queue.length;
                }

                queue.splice(constrainedIndex, 1);

                client.queueManager.sendQueue(queueType);
            },
            clearQueue(queueType) {
                const queue = client.queueManager.getQueue(queueType);

                queue.splice(0, queue.length);
            },
            sendQueue(queueType) {
                if (client.queueManager.queuesToSend.has(queueType)) {
                    return;
                }

                client.queueManager.queuesToSend.add(queueType);

                setTimeout(() => {
                    client.queueManager.queuesToSend.forEach(queueTypeToSend => {
                        client.queueManager.queuesToSend.delete(queueTypeToSend);

                        let queueShortName: string | undefined;

                        switch (queueTypeToSend) {
                            case 'free':
                                if (client.queueManager.free.queue.length > 0) {
                                    client.systemService.sendCommands(client.queueManager.free.queue.map(value => value.command));

                                    client.queueManager.clearQueue('free');
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

                        const queue = client.queueManager.getQueue(queueTypeToSend);

                        client.systemService.sendCommand(`clearqueue ${queueShortName}`);

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

                            client.queueManager.balance.expected = expectedCommand
                            client.systemService.sendCommand(`queue add ${queueShortName} ${expectedCommand}`);
                        }
                    });
                });
            }
        };

        client.systemService.sendCommands(
            new Array(9).fill('').map((_value, count) => {
                return `alias set queuemanager${count + 1} ${new Array(count + 1).fill('').map((_value, index) => `%${index + 1}`).join('/')}`;
            })
        );

        client.queueManager.echo('Loaded.');
    }
);
