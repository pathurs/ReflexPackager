import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const removed = new TriggerItem(
    'Removed',
    /^\[System\]: Removed the command at position (\d+) in your (\w+) queue\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: SafeQueueType; 3: string }) {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                const index = Number(args[1]) - 1;
                const queue = args[2];

                switch (queue) {
                    case 'bal':
                    case 'balance':
                        {
                            const commands = client.queueservice.balanceQueue.splice(index, 1);

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('bal')) {
                                    subscription.subscriber('bal', 'remove', { index, command: commands[0] });
                                }
                            });
                        }
                        break;

                    case 'eq':
                    case 'equilibrium':
                        {
                            const commands = client.queueservice.equilibriumQueue.splice(index, 1);

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('eq')) {
                                    subscription.subscriber('eq', 'remove', { index, command: commands[0] });
                                }
                            });
                        }
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        {
                            const commands = client.queueservice.equilibriumBalanceQueue.splice(index, 1);

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('eqbal')) {
                                    subscription.subscriber('eqbal', 'remove', { index, command: commands[0] });
                                }
                            });
                        }
                        break;

                    case 'class':
                        {
                            const commands = client.queueservice.classQueue.splice(index, 1);

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('class')) {
                                    subscription.subscriber('class', 'remove', { index, command: commands[0] });
                                }
                            });
                        }
                        break;

                    case 'ship':
                        {
                            const commands = client.queueservice.shipQueue.splice(index, 1);

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('ship')) {
                                    subscription.subscriber('ship', 'remove', { index, command: commands[0] });
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



