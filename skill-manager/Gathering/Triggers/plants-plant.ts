import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
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
                const item = args[1].trim().toLowerCase();

                if (client.skillmanager.collecting.active && client.skillmanager.gathering.gatherables.includes(item)) {
                    gag_current_line();

                    client.skillmanager.collecting.queue.add(`gather ${item}`);
                }
            }
        )
    ]
);



