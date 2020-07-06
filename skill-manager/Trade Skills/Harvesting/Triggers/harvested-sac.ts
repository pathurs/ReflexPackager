import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const harvestedSac = new TriggerItem(
    'Harvested Sac',
    /^You reach down and expertly pry back the jaws of the dead snake\. Reaching in with your fingers, careful to avoid the sharp fangs, you tear out the two venom sacs\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                client.skillManager.skills.trade.collecting.onCollected(args);
            }
        )
    ]
);
