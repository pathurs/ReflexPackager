import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedFailRebound1 = new TriggerItem(
    'Used Fail Rebound 1',
    [
        /^You give ([A-Z][a-z]+) a sound thumping with your blackjack\.$/,
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
