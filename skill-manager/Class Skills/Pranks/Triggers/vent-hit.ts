import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const ventHit = new TriggerItem(
    'Vent Hit',
    /^Drawing upon all of your contempt for the stoic and the dull, you viciously smack ([A-Z][a-z]+) about the chops\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'vent', 'hit', args);
                }
            }
        )
    ]
);
