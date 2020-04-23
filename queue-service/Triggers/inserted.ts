import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const inserted = new TriggerItem(
    'Inserted',
    /^\[System\]: inserted command #(\d) in the (\w+) queue with ([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: SafeQueueType; 3: string }) {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                const index = Number(args[1]) - 1;
                const queue = args[2];
                const command = args[3];

                switch (queue) {
                    case 'bal':
                    case 'balance':
                        {
                            const rest = client.queueservice.balanceQueue.slice(index);

                            client.queueservice.balanceQueue.splice(index, rest.length, ...[command, ...rest]);

                            if (client.queueservice.balanceQueue.length > 6) {
                                client.queueservice.balanceQueue.splice(6);
                            }

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('bal')) {
                                    subscription.subscriber('bal', 'insert', { index, command });
                                }
                            });
                        }
                        break;

                    case 'eq':
                    case 'equilibrium':
                        {
                            client.queueservice.equilibriumQueue.push(command);
                            const rest = client.queueservice.equilibriumQueue.slice(index);

                            client.queueservice.equilibriumQueue.splice(index, rest.length, ...[command, ...rest]);

                            if (client.queueservice.equilibriumQueue.length > 6) {
                                client.queueservice.equilibriumQueue.splice(6);
                            }

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('eq')) {
                                    subscription.subscriber('eq', 'insert', { index, command });
                                }
                            });
                        }
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        {
                            client.queueservice.equilibriumBalanceQueue.push(command);
                            const rest = client.queueservice.equilibriumBalanceQueue.slice(index);

                            client.queueservice.equilibriumBalanceQueue.splice(index, rest.length, ...[command, ...rest]);

                            if (client.queueservice.equilibriumBalanceQueue.length > 6) {
                                client.queueservice.equilibriumBalanceQueue.splice(6);
                            }

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('eqbal')) {
                                    subscription.subscriber('eqbal', 'insert', { index, command });
                                }
                            });
                        }
                        break;

                    case 'class':
                        {
                            client.queueservice.classQueue.push(command);
                            const rest = client.queueservice.classQueue.slice(index);

                            client.queueservice.classQueue.splice(index, rest.length, ...[command, ...rest]);

                            if (client.queueservice.classQueue.length > 6) {
                                client.queueservice.classQueue.splice(6);
                            }

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('class')) {
                                    subscription.subscriber('class', 'insert', { index, command });
                                }
                            });
                        }
                        break;

                    case 'ship':
                        {
                            client.queueservice.shipQueue.push(command);
                            const rest = client.queueservice.shipQueue.slice(index);

                            client.queueservice.shipQueue.splice(index, rest.length, ...[command, ...rest]);

                            if (client.queueservice.shipQueue.length > 6) {
                                client.queueservice.shipQueue.splice(6);
                            }

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('ship')) {
                                    subscription.subscriber('ship', 'insert', { index, command });
                                }
                            });
                        }
                        break;

                    default:
                        client.queueservice.error(`Unknown queue type '${queue}'.`);
                        return;
                }
            }
        )
    ]
);



