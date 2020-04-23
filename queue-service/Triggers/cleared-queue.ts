
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient, SafeQueueType } from '../queue-service';

declare const client: QueueServiceClient;

export const clearedQueue = new TriggerItem(
    'Cleared Queue',
    /^\[System\]: Queued (\w+) commands cleared\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: SafeQueueType }) {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                const queue = args[1];

                switch (queue) {
                    case 'bal':
                    case 'balance':
                        client.queueservice.balanceQueue = [];

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('bal')) {
                                subscription.subscriber('bal', 'clear', { index: -1, command: '' });
                            }
                        });
                        break;

                    case 'eq':
                    case 'equilibrium':
                        client.queueservice.equilibriumQueue = [];

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eq')) {
                                subscription.subscriber('eq', 'clear', { index: -1, command: '' });
                            }
                        });
                        break;

                    case 'eqbal':
                    case 'equilibriumbalance':
                        client.queueservice.equilibriumBalanceQueue = [];

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('eqbal')) {
                                subscription.subscriber('eqbal', 'clear', { index: -1, command: '' });
                            }
                        });
                        break;

                    case 'class':
                        client.queueservice.classQueue = [];

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('class')) {
                                subscription.subscriber('class', 'clear', { index: -1, command: '' });
                            }
                        });
                        break;

                    case 'ship':
                        client.queueservice.shipQueue = [];

                        client.queueservice.subscriptions.forEach(subscription => {
                            if (subscription.queues.includes('ship')) {
                                subscription.subscriber('ship', 'clear', { index: -1, command: '' });
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



