import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const hit = new TriggerItem(
    'Hit',
    /^([A-Z][a-z]+) suddenly starts scratching at an itch like mad\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'itchpowder', 'slip itchpowder', 'hit', args);
                }
            }
        )
    ]
);
