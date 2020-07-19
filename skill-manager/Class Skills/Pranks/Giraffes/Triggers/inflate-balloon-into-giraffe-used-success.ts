import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const inflateBalloonIntoGiraffeUsedSuccess = new TriggerItem(
    'Inflate Balloon Into Giraffe - Used Success',
    /^You inflate your balloon and start twisting and shaping it. When you are finished it is shaped as a nearly life-sized giraffe!$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'giraffes', 'inflate balloon into giraffe', ['used', 'success'], args);
                }
            }
        )
    ]
);
