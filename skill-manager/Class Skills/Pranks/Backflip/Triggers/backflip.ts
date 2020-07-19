import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const backflipBackflip = new TriggerItem(
    'Backflip - Backflip',
    /^You gather your legs under you and backflip out to the ([a-z]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'backflip', 'backflip', ['used', 'success'], args);
                }
            }
        )
    ]
);



