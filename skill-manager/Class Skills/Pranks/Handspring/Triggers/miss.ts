import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

// CANNOT BE MULTI-LINED

export const handspringMiss = new TriggerItem(
    'Handspring Miss',
    /^You miss ([A-Z][a-z]+) as you handspring in\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'handspring', 'handspring', 'miss', args);
                }
            }
        )
    ]
);
