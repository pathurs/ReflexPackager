
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const automaticallyAdded = new TriggerItem(
    'Automatically Added',
    /^([\w\W]+) was added to your ([\w\W]+) queue\.$/,
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
                    client.queueManager.error(`Unknown queue type '${args[2]}'.`);

                    if (client.queueManager.settings.gag) {
                        client.queueManager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // const queue = client.queueManager.getQueue(queueType);

                // client.queueManager.appendCommand(command, { [queueType]: true });

                // client.queueManager.emit(queueType, 'add', { queue: queueType, index: queue.length - 1, command });
            }
        )
    ]
);



