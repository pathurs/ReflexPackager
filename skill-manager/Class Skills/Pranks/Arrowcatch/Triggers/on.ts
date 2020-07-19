import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const on = new TriggerItem(
    'On',
    [
        /^You have begun to look for arrows to pluck from the air\.$/,
        /^You already have arrowcatching on\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'arrowcatch', 'arrowcatch on', ['used', 'on'], args);
                }
            }
        )
    ]
);



