import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedMiss = new TriggerItem(
    'Used Miss',
    /^You dart your hand out towards the face of ([A-Z][a-z]+), but (?:he|she) ducks back\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'liberate', 'liberate tongue of', ['used', 'miss'], args);
                }
            }
        )
    ]
);
