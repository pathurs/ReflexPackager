

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
                if (!client.queuemanager.settings.enabled) {
                    return;
                }

                if (client.queuemanager.settings.gag) {
                    gag_current_line();
                }

                // client.queuemanager.clearQueue('balance');
                // client.queuemanager.clearQueue('equilibrium');
                // client.queuemanager.clearQueue('equilibriumBalance');
                // client.queuemanager.clearQueue('class');
                // client.queuemanager.clearQueue('ship');

                // client.queuemanager.emit('balance', 'clear', { queue: 'balance', index: 0, command: '' });
                // client.queuemanager.emit('equilibrium', 'clear', { queue: 'equilibrium', index: 0, command: '' });
                // client.queuemanager.emit('equilibriumBalance', 'clear', { queue: 'equilibriumBalance', index: 0, command: '' });
                // client.queuemanager.emit('class', 'clear', { queue: 'class', index: 0, command: '' });
                // client.queuemanager.emit('ship', 'clear', { queue: 'ship', index: 0, command: '' });
            }
        )
    ]
);



