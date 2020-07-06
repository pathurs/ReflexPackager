import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const liberateStutteredOne = new TriggerItem(
    'Liberate Stuttered One',
    /^You cast your eye over the wagging tongue of ([A-Z][a-z]+), awaiting your moment\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'liberate', 'stutteredone', args);
                }
            }
        )
    ]
);
