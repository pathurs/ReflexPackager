import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const prepended = new TriggerItem(
    'Prepended',
    /^\[System\]: Prepended ([\w\W]+) to your (\w+) queue\./,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: SafeQueueType }) {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                const queue = args[2];
                const command = args[1];

                switch (queue) {
                    case 'bal':
                    case 'balance':
                        client.queueservice.balanceQueue.unshift(command);

                        if (client.queueservice.balanceQueue.length > 6) {
                            client.queueservice.balanceQueue.splice(6);
                        }

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('bal')) {
                                subscription.subscriber('bal', 'prepend', { index: 0, command });
                            }
                        });
                        break;

                    case 'eq':
                    case 'equilibrium':
                        client.queueservice.equilibriumQueue.unshift(command);

                        if (client.queueservice.equilibriumQueue.length > 6) {
                            client.queueservice.equilibriumQueue.splice(6);
                        }

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eq')) {
                                subscription.subscriber('eq', 'prepend', { index: 0, command });
                            }
                        });
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        client.queueservice.equilibriumBalanceQueue.unshift(command);

                        if (client.queueservice.equilibriumBalanceQueue.length > 6) {
                            client.queueservice.equilibriumBalanceQueue.splice(6);
                        }

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eqbal')) {
                                subscription.subscriber('eqbal', 'prepend', { index: 0, command });
                            }
                        });
                        break;

                    case 'class':
                        client.queueservice.classQueue.unshift(command);

                        if (client.queueservice.classQueue.length > 6) {
                            client.queueservice.classQueue.splice(6);
                        }

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('class')) {
                                subscription.subscriber('class', 'prepend', { index: 0, command });
                            }
                        });
                        break;

                    case 'ship':
                        client.queueservice.shipQueue.unshift(args[2]);

                        if (client.queueservice.shipQueue.length > 6) {
                            client.queueservice.shipQueue.splice(6);
                        }

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('ship')) {
                                subscription.subscriber('ship', 'prepend', { index: 0, command });
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



