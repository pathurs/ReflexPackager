import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { GMCPServiceClient } from '../../gmcp-service/gmcp-service';
import { TradeskillManagerClient, HarvestingEnvironmentDictionary } from '../tradeskill-manager';

declare const client: TradeskillManagerClient & GMCPServiceClient;

export const harvest = new AliasItem(
    'Harvest',
    /^harvest$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                // Delete when got all plants in all environments
                send_command('plants');

                client.tradeskillmanager.harvesting.queue = [];

                for (const environment in client.tradeskillmanager.harvesting.environments) {
                    if (client.gmcpservice.latest['Room.Info']?.environment === environment) {
                        const toHarvest: string[] = client.tradeskillmanager.harvesting.environments[<keyof HarvestingEnvironmentDictionary>environment];

                        toHarvest.forEach(harvestable => {
                            client.tradeskillmanager.harvesting.queue.push(`harvest ${harvestable}`);

                            client.tradeskillmanager.harvesting.running = true;
                        });
                        break;
                    }
                }

                if (client.tradeskillmanager.harvesting.running) {
                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
                else if (client.gmcpservice.latest['Room.Info']?.environment) {
                    display_notice(`Tradeskill Manager: Found nothing to harvest from '${client.gmcpservice.latest['Room.Info']?.environment}'.`, '#FF0000');
                }
            }
        )
    ]
);
