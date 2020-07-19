import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedSuccess = new TriggerItem(
    'Used Success',
    [
        /^You're quite the slippery little fellow aren't you\?$/,
        /^You're already quite slippery\.$/,
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'slipperiness', 'slipperiness', ['used', 'success'], args);
                }
            }
        )
    ]
);



