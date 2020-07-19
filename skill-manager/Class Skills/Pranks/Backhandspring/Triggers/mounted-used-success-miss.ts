import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const mountedUsedSuccessMiss = new TriggerItem(
    'Mounted Used Success Miss',
    [
        /^You launch yourself from the back of your mount and flip away from the area\.$/,
        /^You flip into a backwards handspring to the ([a-z]+) and miss ([A-Z][a-z]+) on the way out\.$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'backhandspring', 'backhandspring', ['used', 'success', 'miss'], args);
                }
            }
        )
    ]
);
