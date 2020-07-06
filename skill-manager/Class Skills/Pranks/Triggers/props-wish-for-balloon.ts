import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const propsWishForBalloon = new MultiTriggerItem(
    'Props Wish for Balloon',
    [
        /^You throw a golden cube up into the air, and down comes a balloon\.$/,
        /^You throw a golden cube up into the air, and down comes a bunch of balloons\.$/
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'wishforballoon', 'success', args);
                }
            }
        )
    ]
);
