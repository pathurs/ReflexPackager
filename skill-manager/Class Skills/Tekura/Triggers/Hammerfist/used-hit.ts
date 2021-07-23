import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedHit = new TriggerItem(
    'Used Hit',
    [
        /^You ball up one fist and hammerfist ([A-Z][a-z]+)\.$/,
        /^You connect to the ([\w\W]+)!$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('tekura', 'hammerfist', 'hammerfist', ['used', 'hit'], args);
                }
            }
        )
    ]
);



