import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const wishForMickeyUsedSuccess = new TriggerItem(
    'Wish For Mickey Used Success',
    [
        /^With a flourish, you throw a golden cube into the air, and down comes a mickey\.$/,
        /^With a flourish, you throw a golden cube into the air, and down comes a bunch of mickeys\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'wish for mickey', ['used', 'success'], args);
                }
            }
        )
    ]
);
