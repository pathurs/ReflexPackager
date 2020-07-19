import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const stutterThree = new TriggerItem(
    'Stutter Three',
    /^You sense your moment grows near as the tongue of ([A-Z][a-z]+) continues to flap\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'liberate', undefined, ['stutter', 'stutterthree'], args);
                }
            }
        )
    ]
);
