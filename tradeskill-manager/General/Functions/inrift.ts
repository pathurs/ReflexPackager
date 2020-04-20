import { FunctionItem } from '../../../source';
import { TradeskillManagerClient, TransmutationNamesDictionary, GatheringNamesDictionary, HarvestingNamesDictionary, ButcheringNamesDictionary, InkmillingNamesDictionary } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const inrift = new FunctionItem(
    'tradeskill-manager:inrift',
    function (args: TriggerFunctionArgs) {
        const amountMatch = args[1] || args[3] || args[5] || args[7] || args[9] || args[11] || '';
        const itemNameMatch = args[2] || args[4] || args[6] || args[8] || args[10] || args[12] || '';

        const amount = amountMatch.match(/(\d+)/)?.[1] || '1';
        let item: string | undefined;

        if (itemNameMatch in client.tradeskillmanager.harvesting.names) {
            item = client.tradeskillmanager.harvesting.names[<keyof HarvestingNamesDictionary>itemNameMatch];
        }
        else if (itemNameMatch in client.tradeskillmanager.transmutation.names) {
            item = client.tradeskillmanager.transmutation.names[<keyof TransmutationNamesDictionary>itemNameMatch];
        }
        else if (itemNameMatch in client.tradeskillmanager.gathering.names) {
            item = client.tradeskillmanager.gathering.names[<keyof GatheringNamesDictionary>itemNameMatch];
        }
        else if (itemNameMatch in client.tradeskillmanager.butchering.names) {
            item = client.tradeskillmanager.butchering.names[<keyof ButcheringNamesDictionary>itemNameMatch];
        }
        else if (itemNameMatch in client.tradeskillmanager.inkmilling.names) {
            item = client.tradeskillmanager.inkmilling.names[<keyof InkmillingNamesDictionary>itemNameMatch];
        }

        if (item) {
            send_command(`inrift ${amount} ${item}`);
        }
    }
);
