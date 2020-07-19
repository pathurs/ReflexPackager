import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

// CANNOT BE MULTI-LINED

export const handspringHit = new TriggerItem(
    'Handspring Hit',
    /^Your feet slam into ([A-Z][a-z]+) knocking (?:him|her) off (?:his|her) feet\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'handspring', 'handspring', 'hit', args);
                }
            }
        )
    ]
);
