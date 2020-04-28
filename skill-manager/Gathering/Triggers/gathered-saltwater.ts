import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const gatheredSaltwater = new TriggerItem(
    'Gathered Saltwater',
    /^Using your acute sight, you examine the surrounding sea\. You spot a sparkling patch of pure saltwater, free of impurities, and catch it in [\w\W]+\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillmanager.gathering.running) {
                    client.skillmanager.inrift([args[0], undefined, 'sips of saltwater']);
                    client.skillmanager.runQueue();
                }
            }
        )
    ]
);



