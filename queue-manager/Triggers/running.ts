
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
                client.queueManager.onRun(args);
            }
        )
    ]
);



