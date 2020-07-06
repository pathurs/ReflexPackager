import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gatheredSaltwater = new TriggerItem(
    'Gathered Saltwater',
    /^Using your acute sight, you examine the surrounding sea\. You spot a sparkling patch of pure saltwater, free of impurities, and catch it in [\w\W]+\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                client.skillManager.skills.trade.collecting.onCollected(args);
            }
        )
    ]
);



