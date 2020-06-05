import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: SkillManagerClient & GMCPServiceClient;

export const mineralsMineral = new TriggerItem(
    'Minerals Mineral',
    /^([\w\W]+)\s+(?:Plentiful|Abundant|Moderate|Sparse)$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                const item = args[1].trim().toLowerCase();

                if (client.skillManager.collecting.active && client.skillManager.transmutation.extractables.includes(item)) {
                    gag_current_line();

                    client.skillManager.collecting.queue.add(`extract ${item}`);
                }
            }
        )
    ]
);



