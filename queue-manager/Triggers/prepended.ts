import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const prepended = new TriggerItem(
    'Prepended',
    /^\[System\]: Prepended ([\w\W]+) to your ([\w\W]+) queue\./,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string }) {
                if (!client.queueManager.settings.enabled) {
                    return;
                }

                if (client.queueManager.settings.gag) {
                    gag_current_line();
                }

                // const command = args[1];
                const queueType = client.queueManager.noraliseQueueType(args[2]);

                if (!queueType) {
                    client.queueManager.error(`Unknown queue type '%lightgrey%${args[2]}%end%'.`);

                    if (client.queueManager.settings.gag) {
                        client.queueManager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // client.queueManager.prependCommand(command, { [queueType]: true });

                // client.queueManager.emit(queueType, 'prepend', { queue: queueType, index: 0, command });
            }
        )
    ]
);



