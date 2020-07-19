import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const wishForBalloonUsedSuccess = new TriggerItem(
    'Wish For Balloon Used Success',
    [
        /^You throw a golden cube up into the air, and down comes a balloon\.$/,
        /^You throw a golden cube up into the air, and down comes a bunch of balloons\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'wish for balloon', ['used', 'success'], args);
                }
            }
        )
    ]
);
