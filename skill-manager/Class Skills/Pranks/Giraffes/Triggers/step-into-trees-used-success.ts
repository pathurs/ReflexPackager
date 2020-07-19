import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const stepIntoTreesUsedSuccess = new TriggerItem(
    'Step Into Trees - Used Success',
    /^You step off your giraffe into the trees\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'giraffes', 'step into trees', ['used', 'success'], args);
                }
            }
        )
    ]
);
