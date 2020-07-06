import { ExecuteScriptAction, MultiLineTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const propsList = new MultiLineTriggerItem(
    'Props List',
    [
        /Prop            Current stock   Maximum stock  /,
        /-------------------------------------------------------------------------------/,
        /Balloon\s+(\d+)\s+(\d+)/,
        /Itchpowder\s+(\d+)\s+(\d+)/,
        /Mickey\s+(\d+)\s+(\d+)/,
        /-------------------------------------------------------------------------------/,
    ],
    [
        new ExecuteScriptAction(
            function (args: MultiLineTriggerFunctionArgs) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'props', 'props', 'list', args);
                }
            }
        )
    ]
);
