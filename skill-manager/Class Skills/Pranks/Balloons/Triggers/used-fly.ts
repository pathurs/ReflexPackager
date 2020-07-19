import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedFly = new TriggerItem(
    'Used Fly',
    /^You quickly inflate a balloon, and grab onto its string so that it carries you with it as it floats into the sky\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'balloons', 'inflate balloon', ['used', 'success', 'start', 'fly'], args);
                }
            }
        )
    ]
);



