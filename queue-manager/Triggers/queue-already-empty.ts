

import { ExecuteScriptAction, MultiTriggerItem } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const queueAlreadyEmpty = new MultiTriggerItem(
    'queueAlreadyEmpty',
    [
        /^Your queues are already empty\.$/,
        /^You have no commands queued for equilibrium\.$/,
        /^Your (?:eqbal|class balance|ship) queue is already empty\.$/
    ],
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

                // client.queueManager.emit(queueType, 'clear', { queue: queueType, index: 0, command: '' });
            }
        )
    ]
);



