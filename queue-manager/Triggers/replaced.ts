import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const replaced = new TriggerItem(
    'Replaced',
    /^\[System\]: replaced command #(\d+) in the ([\w\W]+) queue with ([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string; 3: string }) {
                if (!client.queuemanager.settings.enabled) {
                    return;
                }

                if (client.queuemanager.settings.gag) {
                    gag_current_line();
                }

                // const index = Number(args[1]) - 1;
                const queueType = client.queuemanager.noraliseQueueType(args[2]);
                // const command = args[3];

                if (!queueType) {
                    client.queuemanager.error(`Unknown queue type '%lightgrey%${args[2]}%end%'.`);

                    if (client.queuemanager.settings.gag) {
                        client.queuemanager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // client.queuemanager.replaceCommand(queueType, index, command);

                // client.queuemanager.emit(queueType, 'replace', { queue: queueType, index, command });
            }
        )
    ]
);



