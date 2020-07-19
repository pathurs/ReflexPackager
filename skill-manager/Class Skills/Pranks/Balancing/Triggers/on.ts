import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const on = new TriggerItem(
    'On',
    [
        /^You move onto the balls of your feet and begin to concentrate on balance\.$/,
        /^You're already balancing\.$/
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



