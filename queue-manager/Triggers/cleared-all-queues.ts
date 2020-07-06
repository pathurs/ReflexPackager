

import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const clearedAllQueue = new TriggerItem(
    'Cleared All Queues',
    /^Cleared your queues\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (!client.queueManager.settings.enabled) {
                    return;
                }

                if (client.queueManager.settings.gag) {
                    gag_current_line();
                }

                // client.queueManager.clearQueue('balance');
                // client.queueManager.clearQueue('equilibrium');
                // client.queueManager.clearQueue('equilibriumBalance');
                // client.queueManager.clearQueue('class');
                // client.queueManager.clearQueue('ship');

                // client.queueManager.emit('balance', 'clear', { queue: 'balance', index: 0, command: '' });
                // client.queueManager.emit('equilibrium', 'clear', { queue: 'equilibrium', index: 0, command: '' });
                // client.queueManager.emit('equilibriumBalance', 'clear', { queue: 'equilibriumBalance', index: 0, command: '' });
                // client.queueManager.emit('class', 'clear', { queue: 'class', index: 0, command: '' });
                // client.queueManager.emit('ship', 'clear', { queue: 'ship', index: 0, command: '' });
            }
        )
    ]
);



