import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const wishForItchpowderUsedSuccess = new TriggerItem(
    'Wish For Itchpowder Used Success',
    [
        /^You toss a golden cube in the air, and down comes a packet of itchpowder\.$/,
        /^You toss a golden cube in the air, and down comes several packets of itchpowder\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'wish for itchpowder', ['used', 'success'], args);
                }
            }
        )
    ]
);
