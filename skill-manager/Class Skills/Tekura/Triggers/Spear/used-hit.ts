import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedHit = new TriggerItem(
    'Used Hit',
    [
        /^You form a spear hand and stab out towards (\w+)\.$/,
        /^You connect to the (.+)!$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('tekura', 'spear', 'spear', ['used', 'hit'], args);
                }
            }
        )
    ]
);



