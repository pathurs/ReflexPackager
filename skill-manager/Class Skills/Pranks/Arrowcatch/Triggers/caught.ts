import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const caught = new TriggerItem(
    'Caught',
    [
        /^An arrow flies in towards you\.$/,
        /^You reach out and nimbly pluck the arrow from the air\.$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'arrowcatch', 'arrowcatch on', ['caught'], args);
                }
            }
        )
    ]
);



