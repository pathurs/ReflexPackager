import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const backhandspringSuccess = new TriggerItem(
    'Backhandspring Success',
    /^You flip into a backwards handspring to the ([a-z]+), and strike ([A-Z][a-z]+) on the way out\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'backhandspring', 'success', args);
                }
            }
        )
    ]
);
