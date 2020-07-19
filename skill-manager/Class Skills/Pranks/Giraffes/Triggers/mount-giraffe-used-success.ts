import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const mountGiraffeUsedSuccess = new TriggerItem(
    'Mount Giraffe - Used Success',
    /^You climb up on a [a-z]+ balloon twisted into a giraffe\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'giraffes', 'mount giraffe', ['used', 'success'], args);
                }
            }
        )
    ]
);
