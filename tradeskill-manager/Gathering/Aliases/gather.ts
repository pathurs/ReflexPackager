import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { GMCPServiceClient } from '../../../gmcp-service/gmcp-service';
import { TradeskillManagerClient, GatheringEnvironmentDictionary } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient & GMCPServiceClient;

export const gather = new AliasItem(
    'Gather',
    /^gather$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                // Delete when got all plants in all environments
                send_command('plants');

                client.tradeskillmanager.gathering.queue = [];

                for (const environment in client.tradeskillmanager.gathering.environments) {
                    if (client.gmcpservice.latest['Room.Info']?.environment === environment) {
                        const toGather: string[] = client.tradeskillmanager.gathering.environments[<keyof GatheringEnvironmentDictionary>environment];

                        toGather.forEach(gatherable => {
                            client.tradeskillmanager.gathering.queue.push(`gather ${gatherable}`);

                            client.tradeskillmanager.gathering.running = true;
                        });
                        break;
                    }
                }

                if (client.tradeskillmanager.gathering.running) {
                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
                else if (client.gmcpservice.latest['Room.Info']?.environment) {
                    display_notice(`Tradeskill Manager: Found nothing to gather from '${client.gmcpservice.latest['Room.Info']?.environment}'.`, '#FF0000');
                }
            }
        )
    ]
);
