import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const inserted = new TriggerItem(
    'Inserted',
    /^\[System\]: inserted command #(\d) in the ([\w\W]+) queue with ([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string; 3: string }) {
                if (!client.queueManager.settings.enabled) {
                    return;
                }

                if (client.queueManager.settings.gag) {
                    gag_current_line();
                }

                // const index = Number(args[1]) - 1;
                const queueType = client.queueManager.noraliseQueueType(args[2]);
                // const command = args[3];

                if (!queueType) {
                    client.queueManager.error(`Unknown queue type '%lightgrey%${args[2]}%end%'.`);

                    if (client.queueManager.settings.gag) {
                        client.queueManager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // client.queuemanager.insertCommand(queueType, index, command);

                // client.queuemanager.emit(queueType, 'insert', { queue: queueType, index, command });
            }
        )
    ]
);



