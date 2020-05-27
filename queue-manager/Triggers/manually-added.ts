
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const manuallyAdded = new TriggerItem(
    'Manually Added',
    /^\[System\]: Added ([\w\W]+) to your ([\w\W]+) queue\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string }) {
                if (!client.queuemanager.settings.enabled) {
                    return;
                }

                if (client.queuemanager.settings.gag) {
                    gag_current_line();
                }

                // const command = args[1];
                const queueType = client.queuemanager.noraliseQueueType(args[2]);

                if (!queueType) {
                    client.queuemanager.error(`Unknown queue type '%lightgrey%${args[2]}%end%'.`);

                    if (client.queuemanager.settings.gag) {
                        client.queuemanager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // const queue = client.queuemanager.getQueue(queueType);

                // client.queuemanager.appendCommand(command, { [queueType]: true });

                //  client.queuemanager.emit(queueType, 'add', { queue: queueType, index: queue.length - 1, command });
            }
        )
    ]
);



