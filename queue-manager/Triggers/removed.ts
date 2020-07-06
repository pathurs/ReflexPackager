import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const removed = new TriggerItem(
    'Removed',
    /^\[System\]: Removed the command at position (\d+) in your ([\w\W]+) queue\.$/,
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

                if (!queueType) {
                    client.queueManager.error(`Unknown queue type '%lightgrey%${args[2]}%end%'.`);

                    if (client.queueManager.settings.gag) {
                        client.queueManager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // const queue = client.queueManager.getQueue(queueType);
                // const queuedCommand = <QueueManagerQueuedCommand | undefined>queue[index];

                // if (!queuedCommand) {
                //     client.queueManager.error(`Untracked command in '%lightgrey%${queueType}%end%' at position '%lightgrey%${index}%end%'.`);

                //     return;
                // }

                // client.queueManager.removeCommand(queueType, index);

                // client.queueManager.emit(queueType, 'remove', { queue: queueType, index, command: queuedCommand.command });
            }
        )
    ]
);



