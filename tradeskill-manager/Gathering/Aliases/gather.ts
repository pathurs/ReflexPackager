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
                    client.tradeskillmanager.runQueue();
                }
                else if (client.gmcpservice.latest['Room.Info']?.environment) {
                    client.tradeskillmanager.echo(`Found nothing to gather from '%white%${client.gmcpservice.latest['Room.Info']?.environment}%reset%'.`);
                }
            }
        )
    ]
);
