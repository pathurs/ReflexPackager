
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { QueueManagerClient } from 'queue-manager/queue-manager';

declare const client: QueueManagerClient;

export const running = new TriggerItem(
    'Running',
    /^\[System\]: Running queued ([\w\W]+) command: ([\w\W]+)$/,
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

                const queueType = client.queuemanager.noraliseQueueType(args[1]);

                if (!queueType) {
                    client.queuemanager.error(`Unknown queue type '%lightgrey%${args[1]}%end%'.`);

                    if (client.queuemanager.settings.gag) {
                        client.queuemanager.error(`Original line '%lightgrey%${args[0]}%end%'.`);
                    }

                    return;
                }

                const command = args[2];

                const commands = client.queuemanager.parseCommand(queueType, command);

                commands.forEach(() => {
                    client.queuemanager.removeCommand(queueType, 0);
                });

                client.queuemanager.emit(queueType, 'run', { queue: queueType, index: 0, commands });
            }
        )
    ]
);



