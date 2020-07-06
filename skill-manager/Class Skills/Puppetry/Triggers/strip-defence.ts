import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^You sense the speed defence of ([A-Z][a-z]+) melt magically away beneath your fingers\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.puppetry.active) {
                    client.skillManager.onAbility('puppetry', 'CHANGEME', 'CHANGEME', args);
                }
            }
        )
    ]
);
