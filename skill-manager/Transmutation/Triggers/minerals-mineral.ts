import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';
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

                if (client.skillmanager.transmutation.running) {
                    gag_current_line();

                    client.skillmanager.transmutation.queue.push(`extract ${item}`);

                    client.skillmanager.runQueue();
                }
            }
        )
    ]
);



