import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedHit = new TriggerItem(
    'Used Hit',
    [
        /^You unleash a powerful hook towards (\w+)\.$/,
        /^You connect to the ([\w\W]+)!$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('tekura', 'hook', 'hook', ['used', 'hit'], args);
                }
            }
        )
    ]
);



