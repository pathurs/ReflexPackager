

import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueServiceClient } from '../queue-service';

declare const client: QueueServiceClient;

export const clearedAllQueue = new TriggerItem(
    'Cleared All Queues',
    /^Cleared your queues\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.queueservice.gag) {
                    gag_current_line();
                }

                client.queueservice.balanceQueue = [];

                client.queueservice.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes('bal')) {
                        subscription.subscriber('bal', 'clear', { index: -1, command: '' });
                    }
                });

                client.queueservice.equilibriumQueue = [];

                client.queueservice.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes('eq')) {
                        subscription.subscriber('eq', 'clear', { index: -1, command: '' });
                    }
                });

                client.queueservice.equilibriumBalanceQueue = [];

                client.queueservice.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes('eqbal')) {
                        subscription.subscriber('eqbal', 'clear', { index: -1, command: '' });
                    }
                });

                client.queueservice.classQueue = [];

                client.queueservice.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes('class')) {
                        subscription.subscriber('class', 'clear', { index: -1, command: '' });
                    }
                });

                client.queueservice.shipQueue = [];

                client.queueservice.subscriptions.forEach(subscription => {
                    if (subscription.queues.includes('ship')) {
                        subscription.subscriber('ship', 'clear', { index: -1, command: '' });
                    }
                });
            }
        )
    ]
);



