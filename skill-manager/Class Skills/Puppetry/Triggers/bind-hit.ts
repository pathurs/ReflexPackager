import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const bindHit = new TriggerItem(
    'Bind Hit',
    /^You tie up a puppet of ([A-Z][a-z]+) with a piece of string\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.puppetry.active) {
                    client.skillManager.onAbility('puppetry', 'bind', 'hit', args);
                }
            }
        )
    ]
);
