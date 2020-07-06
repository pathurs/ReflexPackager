import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^You feel the Devil leave you\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillManager.skills.class.tarot.active) {
                    client.skillManager.onAbility('tarot', 'CHANGEME', 'CHANGEME', args);
                }
            }
        )
    ]
);
