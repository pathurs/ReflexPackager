
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const clearedQueue = new TriggerItem(
    'Cleared Queue',
    /^\[System\]: Queued ([\w\W]+) commands cleared\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (!client.queueManager.settings.enabled) {
                    return;
                }

                if (client.queueManager.settings.gag) {
                    gag_current_line();
                }

                const queueType = client.queueManager.noraliseQueueType(args[1]);

                if (!queueType) {
                    client.queueManager.error(`Unknown queue type '${args[1]}'.`);

                    if (client.queueManager.settings.gag) {
                        client.queueManager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // client.queuemanager.clearQueue(queueType);

                // client.queuemanager.emit(queueType, 'clear', { queue: queueType, index: 0, command: '' });
            }
        )
    ]
);



