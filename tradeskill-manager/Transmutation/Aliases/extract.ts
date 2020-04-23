import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { GMCPServiceClient } from '../../../gmcp-service/gmcp-service';
import { TradeskillManagerClient, TransmutationEnvironmentDictionary } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient & GMCPServiceClient;

export const extract = new AliasItem(
    'Extract',
    /^extract$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                // Delete when got all minerals in all environments
                send_command('minerals');

                client.tradeskillmanager.transmutation.queue = [];

                for (const environment in client.tradeskillmanager.transmutation.environments) {
                    if (client.gmcpservice.latest['Room.Info']?.environment === environment) {
                        const toExtract: string[] = client.tradeskillmanager.transmutation.environments[<keyof TransmutationEnvironmentDictionary>environment];

                        toExtract.forEach(extractable => {
                            client.tradeskillmanager.transmutation.queue.push(`extract ${extractable}`);

                            client.tradeskillmanager.transmutation.running = true;
                        });
                        break;
                    }
                }

                if (client.tradeskillmanager.transmutation.running) {
                    client.tradeskillmanager.runQueue();
                }
                else if (client.gmcpservice.latest['Room.Info']?.environment) {
                    client.tradeskillmanager.error(`Found nothing to extract from '${client.gmcpservice.latest['Room.Info']?.environment}'.`);
                }
            }
        )
    ]
);
