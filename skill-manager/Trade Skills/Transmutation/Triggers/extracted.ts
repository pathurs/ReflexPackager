import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const extracted = new TriggerItem(
    'Extracted',
    /^You kneel and collect chunks of earth, using a strong\-smelling solvent to pull (a group of \d+ |an |a |some |\d+ )?([\w\W]+) from the dirt and rock\. This delicate process completed, you set the minerals aside to dry\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                client.skillManager.skills.trade.collecting.onCollected(args);
            }
        )
    ]
);



