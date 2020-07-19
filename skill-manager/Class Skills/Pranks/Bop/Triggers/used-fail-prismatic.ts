import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const bopUsed = new TriggerItem(
    'Bop Used',
    /^Your attack is repelled by the prismatic barrier surrounding ([A-Z][a-z]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    // TODO: Confirm it's bop
                    // client.skillManager.onAbility('pranks', 'bop', 'bop', ['used', 'fail', 'prismatic'], args);
                }
            }
        )
    ]
);
