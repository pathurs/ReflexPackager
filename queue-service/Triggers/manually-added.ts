
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const manuallyAdded = new TriggerItem(
    'Manually Added',
    /^\[System\]: Added ([\w\W]+) to your (\w+) queue\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: SafeQueueType }) {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                const command = args[1];
                const queue = args[2];

                switch (queue) {
                    case 'bal':
                    case 'balance':
                        client.queueservice.balanceQueue.push(command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('bal')) {
                                subscription.subscriber('bal', 'add', { index: client.queueservice.balanceQueue.length - 1, command });
                            }
                        });
                        break;

                    case 'eq':
                    case 'equilibrium':
                        client.queueservice.equilibriumQueue.push(command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eq')) {
                                subscription.subscriber('eq', 'add', { index: client.queueservice.equilibriumQueue.length - 1, command });
                            }
                        });
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        client.queueservice.equilibriumBalanceQueue.push(command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eqbal')) {
                                subscription.subscriber('eqbal', 'add', { index: client.queueservice.equilibriumBalanceQueue.length - 1, command });
                            }
                        });
                        break;

                    case 'class':
                        client.queueservice.classQueue.push(command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('class')) {
                                subscription.subscriber('class', 'add', { index: client.queueservice.classQueue.length - 1, command });
                            }
                        });
                        break;

                    case 'ship':
                        client.queueservice.shipQueue.push(command);

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('ship')) {
                                subscription.subscriber('ship', 'add', { index: client.queueservice.shipQueue.length - 1, command });
                            }
                        });
                        break;

                    default:
                        client.queueservice.error(`Unknown queue type '${queue}'.`);
                        client.queueservice.error(`Original line '${args[0]}'.`);
                        return;
                }
            }
        )
    ]
);



