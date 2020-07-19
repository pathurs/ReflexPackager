import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const stutterFour = new TriggerItem(
    'Stutter Four',
    /^The time is now! You can reach out and pluck the tongue of ([A-Z][a-z]+) right out of (?:his|her) mouth!$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'liberate', undefined, ['stutter', 'stutterfour', 'stutterdone'], args);
                }
            }
        )
    ]
);
