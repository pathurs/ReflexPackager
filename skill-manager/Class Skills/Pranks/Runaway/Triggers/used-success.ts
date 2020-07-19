import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedSuccess = new TriggerItem(
    'Used Success',
    /^You kick your giraffe in the haunches and scream, "RUN AWAY! RUN AWAY!"$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'runaway', 'runaway', ['used', 'success'], args);
                }
            }
        )
    ]
);
