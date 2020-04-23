import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient, HarvestingEnvironmentDictionary, GatheringEnvironmentDictionary, TransmutationEnvironmentDictionary } from '../../tradeskill-manager';
import { GMCPServiceClient } from '../../../gmcp-service/gmcp-service';

declare const client: TradeskillManagerClient & GMCPServiceClient;

export const checkMissingItem = new TriggerItem(
    'Check Missing Item',
    [
        /^The following plants are growing in this room:$/,
        /^([\w\W]+) \((\w+)\)\s+(?:Plentiful|Abundant|Moderate|Sparse)$/,
        /^You spot the following minerals here:$/,
        /^([\w\W]+)\s+(?:Plentiful|Abundant|Moderate|Sparse)$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                const environment = client.gmcpservice.latest['Room.Info']?.environment;
                const item = `${args[2] || args[3]}`.trim().toLowerCase();

                if (client.tradeskillmanager.harvesting.running || client.tradeskillmanager.transmutation.running || client.tradeskillmanager.gathering.running) {
                    gag_current_line();
                }

                if (item === 'undefined' || environment === undefined) {
                    return;
                }

                const inHarvesting = (<string[]>(client.tradeskillmanager.harvesting.environments[<keyof HarvestingEnvironmentDictionary>environment] || [])).includes(item);
                const inTransmutation = (<string[]>(client.tradeskillmanager.transmutation.environments[<keyof TransmutationEnvironmentDictionary>environment] || [])).includes(item);
                const inGathering = (<string[]>(client.tradeskillmanager.gathering.environments[<keyof GatheringEnvironmentDictionary>environment] || [])).includes(item);

                if (!inHarvesting && !inTransmutation && !inGathering) {
                    client.tradeskillmanager.error(`Missing item '${item}' in '${environment}'.`);
                }
            }
        )
    ]
);



