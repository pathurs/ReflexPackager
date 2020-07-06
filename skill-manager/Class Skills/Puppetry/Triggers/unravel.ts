import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^You lift your hands, pressing your palms together before channeling the thought of unravelling\. Slowly you pull your hands apart, splitting the air and ripping a puppet roughly resembling ([A-Z][a-z]+) asunder in the process\.$/,
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
