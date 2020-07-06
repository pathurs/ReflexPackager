import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^A monolith sigil prevents the attempt\.$/,
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
