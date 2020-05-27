

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

                // client.queuemanager.emit(queueType, 'clear', { queue: queueType, index: 0, command: '' });
            }
        )
    ]
);



