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
                if (!client.queuemanager.settings.enabled) {
                    return;
                }

                if (client.queuemanager.settings.gag) {
                    gag_current_line();
                }

                // const index = Number(args[1]) - 1;
                const queueType = client.queuemanager.noraliseQueueType(args[2]);

                if (!queueType) {
                    client.queuemanager.error(`Unknown queue type '%lightgrey%${args[2]}%end%'.`);

                    if (client.queuemanager.settings.gag) {
                        client.queuemanager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                // const queue = client.queuemanager.getQueue(queueType);
                // const queuedCommand = <QueueManagerQueuedCommand | undefined>queue[index];

                // if (!queuedCommand) {
                //     client.queuemanager.error(`Untracked command in '%lightgrey%${queueType}%end%' at position '%lightgrey%${index}%end%'.`);

                //     return;
                // }

                // client.queuemanager.removeCommand(queueType, index);

                // client.queuemanager.emit(queueType, 'remove', { queue: queueType, index, command: queuedCommand.command });
            }
        )
    ]
);



