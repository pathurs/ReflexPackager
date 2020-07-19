import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const bopUsed = new TriggerItem(
    'Bop Used',
    /^A dizzying beam of energy strikes you as your attack rebounds off of ([A-Z][a-z]+)'s shield\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    // TODO: Confirm it's bop
                    // client.skillManager.onAbility('pranks', 'bop', 'bop', ['used', 'fail', 'shield'], args);
                }
            }
        )
    ]
);
