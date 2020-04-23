import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const replaced = new TriggerItem(
    'Replaced',
    /^\[System\]: replaced command #(\d+) in the (\w+) queue with ([\w\W]+)\.$/,
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
                        client.queueservice.balanceQueue.splice(index, 1, command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('bal')) {
                                subscription.subscriber('bal', 'replace', { index, command });
                            }
                        });
                        break;

                    case 'eq':
                    case 'equilibrium':
                        client.queueservice.equilibriumQueue.splice(index, 1, command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eq')) {
                                subscription.subscriber('eq', 'replace', { index, command });
                            }
                        });
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        client.queueservice.equilibriumBalanceQueue.splice(index, 1, command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eqbal')) {
                                subscription.subscriber('eqbal', 'replace', { index, command });
                            }
                        });
                        break;

                    case 'class':
                        client.queueservice.classQueue.splice(index, 1, command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('class')) {
                                subscription.subscriber('class', 'replace', { index, command });
                            }
                        });
                        break;

                    case 'ship':
                        client.queueservice.shipQueue.splice(index, 1, command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('ship')) {
                                subscription.subscriber('ship', 'replace', { index, command });
                            }
                        });
                        break;

                    default:
                        client.queueservice.error(`Unknown queue type '${queue}'.`);
                        return;
                }
            }
        )
    ]
);



