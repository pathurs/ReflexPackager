import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const props = new TriggerItem(
    'Props',
    [
        /Prop            Current stock   Maximum stock  /,
        /-------------------------------------------------------------------------------/,
        /Balloon\s+(\d+)\s+(\d+)/,
        /Itchpowder\s+(\d+)\s+(\d+)/,
        /Mickey\s+(\d+)\s+(\d+)/,
        /-------------------------------------------------------------------------------/,
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'props', 'used', args);
                }
            }
        )
    ]
);
