import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^Adding more detail to your puppet will no longer help\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillManager.skills.class.puppetry.active) {
                    client.skillManager.onAbility('puppetry', 'CHANGEME', 'CHANGEME', args);
                }
            }
        )
    ]
);
