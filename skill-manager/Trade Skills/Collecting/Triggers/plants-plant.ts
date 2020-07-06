import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: SkillManagerClient & GMCPServiceClient;

export const plantsPlant = new TriggerItem(
    'Plants Plant',
    /^(?:[\w\W]+) \((\w+)\)\s+(?:Plentiful|Abundant|Moderate|Sparse)$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                client.skillManager.skills.trade.collecting.onPlant(args);
            }
        )
    ]
);



