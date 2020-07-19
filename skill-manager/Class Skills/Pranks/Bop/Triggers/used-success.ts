import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedSuccess = new TriggerItem(
    'Used Success',
    [
        /^You reach out and bop ([A-Z][a-z]+) on the nose with your blackjack\.$/,
        /^You give ([A-Z][a-z]+) a sound thumping with your blackjack\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'bop', 'bop', ['used', 'success'], args);
                }
            }
        )
    ]
);
