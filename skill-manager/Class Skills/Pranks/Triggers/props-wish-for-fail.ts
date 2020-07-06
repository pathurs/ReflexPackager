import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const propsWishForFail = new MultiTriggerItem(
    'Props Wish For Fail',
    [
        /^You cannot hold any more of that type of prop\.$/,
        /^You can only wish for up to (\d+) more of that prop currently\.$/
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'wishfor', 'fail', args);
                }
            }
        )
    ]
);
