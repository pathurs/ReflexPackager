import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const stutterTwo = new TriggerItem(
    'Stutter Two',
    /^You watch intently as the tongue of ([A-Z][a-z]+) wags back and forth\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'liberate', undefined, ['stutter', 'stuttertwo'], args);
                }
            }
        )
    ]
);
