import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const propsWishForItchpowder = new MultiTriggerItem(
    'Props Wish for Itchpowder',
    [
        /^You toss a golden cube in the air, and down comes a packet of itchpowder\.$/,
        /^You toss a golden cube in the air, and down comes several packets of itchpowder\.$/
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'wishforitchpowder', 'success', args);
                }
            }
        )
    ]
);
