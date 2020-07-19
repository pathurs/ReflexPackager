import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedFailRebound2 = new TriggerItem(
    'Used Fail Rebound 2',
    [
        /^You reach out and bop ([A-Z][a-z]+) on the nose with your blackjack\.$/,
        /^The attack rebounds back onto you!$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'bop', 'bop', ['used', 'fail', 'rebound'], args);
                }
            }
        )
    ]
);
