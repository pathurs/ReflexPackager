import { FunctionItem } from '../source';
import { QueueManagerClient, QueueManager, QueueManagerQueueType, QueueManagerQueueSubscription, QueueManagerQueuedCommand, QueueManagerQueueSubscriber, QueueManagerQueueMethod, QueueManagerSubscriberArgs } from './queue-manager';
import { DisplayServiceClient, DisplayService } from 'display-service/display-service';
import { SystemServiceClient, SystemService } from 'system-service/system-service';

declare const client: QueueManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class QueueManagerC implements QueueManager {
            public settings = this.systemService.defaultsDeep({
                enabled: true,
                gag: true
            });

            public freeQueue: QueueManagerQueuedCommand[] = [];
            public balanceQueue: QueueManagerQueuedCommand[] = [];
            public equilibriumQueue: QueueManagerQueuedCommand[] = [];
            public equilibriumBalanceQueue: QueueManagerQueuedCommand[] = [];
            public classQueue: QueueManagerQueuedCommand[] = [];
            public shipQueue: QueueManagerQueuedCommand[] = [];

            private queuesToSend = new Set<QueueManagerQueueType>();
            private subscriptions: QueueManagerQueueSubscription<QueueManagerQueueType>[] = [];

            public constructor (
                private readonly displayService: DisplayService,
                private readonly systemService: SystemService
            ) {
                // this.systemService.sendCommands(
                //     new Array(9).fill('').map((_value, count) => {
                //         return `alias set queuemanager${count + 1} ${new Array(count + 1).fill('').map((_value, index) => `%${index + 1}`).join('/')}`;
                //     })
                // );

                this.echo('Loaded.');
            }

            public echo(text: string): void {
                this.displayService.echo(`%lightgray%[%deepskyblue%Queue Manager%end%]:%end% ${text}`);
            }

            public error(text: string): void {
                this.echo(`%red%${text}%end%`);
            }

            public subscribe<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>): QueueManagerQueueSubscription<TQueueType> {
                const subscription = {
                    queues,
                    subscriber
                };

                this.subscriptions.push(<QueueManagerQueueSubscription<QueueManagerQueueType>><unknown>subscription);

                return subscription;
            }

            public unsubscribe(subscription: QueueManagerQueueSubscription<QueueManagerQueueType>): void {
                const index = this.subscriptions.findIndex(value => value === subscription);

                this.subscriptions.splice(index, 1);
            }

            public once<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>): QueueManagerQueueSubscription<TQueueType> {
                const subscription = this.subscribe(queues, (queue, method, commands) => {
                    subscriber(queue, method, commands);

                    this.unsubscribe(<QueueManagerQueueSubscription<QueueManagerQueueType>><unknown>subscription);
                });

                return subscription;
            }

            public emit(queueType: QueueManagerQueueType, method: QueueManagerQueueMethod, args: QueueManagerSubscriberArgs): void {
                this.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes(queueType)) {
                        subscription.subscriber(queueType, method, args);
                    }
                });
            }

            public parseCommand(queueType: QueueManagerQueueType, command: string): QueueManagerQueuedCommand[] {
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

                const queue = this.getQueue(queueType);
                const result: QueueManagerQueuedCommand[] = [];

                for (let i = 0; i < commands.length; i++) {
                    if (queue[i].command.trim().toLowerCase() !== commands[i].trim().toLowerCase()) {
                        throw new Error(`Unexpected command in queue. Expected: '${queue[i].command}' Actual: '${commands[i]}' Queue: '${queueType}' Full Command: '${command}'`);
                    }

                    result.push(queue[i]);
                }

                return result;
            }

            public noraliseQueueType(queueType: string): QueueManagerQueueType | undefined {
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
            }

            // public parseQueueTypeInteractions(interactions) {
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
            // }

            public getQueue(queueType: QueueManagerQueueType): QueueManagerQueuedCommand[] {
                switch (queueType) {
                    case 'free':
                        return this.freeQueue;

                    case 'balance':
                        return this.balanceQueue;

                    case 'equilibrium':
                        return this.equilibriumQueue;

                    case 'equilibriumBalance':
                        return this.equilibriumBalanceQueue;

                    case 'class':
                        return this.classQueue;

                    case 'ship':
                        return this.shipQueue;
                }
            }

            public appendCommand(command: string, requires: QueueManagerQueueType = 'free', consumes: QueueManagerQueueType = 'free'): QueueManagerQueuedCommand {
                const queueType = requires;

                const queuedCommand: QueueManagerQueuedCommand = {
                    queue: queueType,
                    command,
                    requires,
                    consumes
                };

                const queue = this.getQueue(queueType);

                queue.push(queuedCommand);

                this.sendQueue(queueType);

                return queuedCommand;
            }

            public prependCommand(command: string, requires: QueueManagerQueueType = 'free', consumes: QueueManagerQueueType = 'free'): QueueManagerQueuedCommand {
                const queueType = requires;

                const queuedCommand: QueueManagerQueuedCommand = {
                    queue: queueType,
                    command,
                    requires,
                    consumes
                };

                const queue = this.getQueue(queueType);

                queue.unshift(queuedCommand);

                this.sendQueue(queueType);

                return queuedCommand;
            }

            // public replaceCommand(_queueType, index, command, requires, _consumes) {
            //     const queueType = client.queueManager.parseQueueTypeInteractions(requires);

            //     const queuedCommand: QueueManagerQueuedCommand = {
            //         queue: queueType,
            //         command
            //     };

            //     const queue = client.queueManager.getQueue(queueType);

            //     let constrainedIndex = index;

            //     if (constrainedIndex < 0) {
            //         constrainedIndex = 0;
            //     }
            //     else if (constrainedIndex > queue.length) {
            //         constrainedIndex = queue.length;
            //     }

            //     queue.splice(constrainedIndex, 1, queuedCommand);

            //     return queuedCommand;
            // }

            // public insertCommand(queueType, index, command, _requires, _consumes) {
            //     const queuedCommand: QueueManagerQueuedCommand = {
            //         queue: queueType,
            //         command
            //     };

            //     const queue = client.queueManager.getQueue(queueType);

            //     let constrainedIndex = index;

            //     if (constrainedIndex < 0) {
            //         constrainedIndex = 0;
            //     }
            //     else if (constrainedIndex > queue.length) {
            //         constrainedIndex = queue.length;
            //     }

            //     queue.splice(constrainedIndex, 0, queuedCommand);

            //     return queuedCommand;
            // }

            public removeCommand(queueType: QueueManagerQueueType, index: number): void {
                const queue = this.getQueue(queueType);

                let constrainedIndex = index;

                if (constrainedIndex < 0) {
                    constrainedIndex = 0;
                }
                else if (constrainedIndex > queue.length) {
                    constrainedIndex = queue.length;
                }

                queue.splice(constrainedIndex, 1);

                this.sendQueue(queueType);
            }

            public clearQueue(queueType: QueueManagerQueueType): void {
                const queue = this.getQueue(queueType);

                queue.splice(0, queue.length);
            }

            public sendQueue(queueType: QueueManagerQueueType): void {
                if (this.queuesToSend.has(queueType)) {
                    return;
                }

                this.queuesToSend.add(queueType);

                setTimeout(() => {
                    this.queuesToSend.forEach(queueTypeToSend => {
                        this.queuesToSend.delete(queueTypeToSend);

                        let queueShortName: string | undefined;

                        switch (queueTypeToSend) {
                            case 'free':
                                if (this.freeQueue.length > 0) {
                                    client.systemService.sendCommands(this.freeQueue.map(value => value.command));

                                    this.clearQueue('free');
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

                        const queue = this.getQueue(queueTypeToSend);

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

                            client.systemService.sendCommand(`queue add ${queueShortName} ${expectedCommand}`);
                        }
                    });
                });
            }

            public onRun(args: TriggerFunctionArgs & { 1: string; 2: string }): void {
                if (!this.settings.enabled) {
                    return;
                }

                if (this.settings.gag) {
                    gag_current_line();
                }

                const queueType = this.noraliseQueueType(args[1]);

                if (!queueType) {
                    this.error(`Unknown queue type '%lightgrey%${args[1]}%end%'.`);

                    if (this.settings.gag) {
                        this.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                const command = args[2];

                const commands = this.parseCommand(queueType, command);

                commands.forEach(() => {
                    this.removeCommand(queueType, 0);
                });

                this.emit(queueType, 'run', { queue: queueType, index: 0, commands });
            }
        }

        client.queueManager = new QueueManagerC(client.displayService, client.systemService);
    }
);
