
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const running = new TriggerItem(
    'Running',
    /^\[System\]: Running queued (\w+) command: ([\w\W]+)$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: SafeQueueType; 2: string }) {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                const queue = args[1];
                // const command = args[2];

                switch (queue) {
                    case 'bal':
                    case 'balance':
                        {
                            const command = client.queueservice.balanceQueue.shift();

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('bal')) {
                                    subscription.subscriber('bal', 'run', { index: 0, command: <string>command });
                                }
                            });
                        }
                        break;

                    case 'eq':
                    case 'equilibrium':
                        {
                            const command = client.queueservice.equilibriumQueue.shift();

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('eq')) {
                                    subscription.subscriber('eq', 'run', { index: 0, command: <string>command });
                                }
                            });
                        }
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        {
                            const command = client.queueservice.equilibriumBalanceQueue.shift();

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('eqbal')) {
                                    subscription.subscriber('eqbal', 'run', { index: 0, command: <string>command });
                                }
                            });
                        }
                        break;

                    case 'class':
                        {
                            const command = client.queueservice.classQueue.shift();

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('class')) {
                                    subscription.subscriber('class', 'run', { index: 0, command: <string>command });
                                }
                            });
                        }
                        break;

                    case 'ship':
                        {
                            const command = client.queueservice.shipQueue.shift();

                            client.queueservice.subscriptions.forEach(subscription => {
                                if (subscription.queues.includes('ship')) {
                                    subscription.subscriber('ship', 'run', { index: 0, command: <string>command });
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



