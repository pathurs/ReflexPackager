import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const on = new TriggerItem(
    'On',
    [
        /^You begin leaping and bouncing about, making it more difficult to hit you\.$/,
        /^You are already bouncing around acrobatically\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'acrobatics', 'acrobatics on', ['used', 'on'], args);
                }
            }
        )
    ]
);



