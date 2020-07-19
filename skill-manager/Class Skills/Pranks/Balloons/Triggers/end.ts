import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const end = new TriggerItem(
    'End',
    [
        /^Your balloon attempts to tug you into the sky, but cannot lift your weight and pops from the strain!$/,
        /^Your balloon pops!$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'balloons', 'inflate balloon', ['end'], args);
                }
            }
        )
    ]
);



