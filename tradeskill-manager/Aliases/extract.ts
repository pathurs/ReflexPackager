import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { GMCPServiceClient } from '../../gmcp-service/gmcp-service';
import { TradeskillManagerClient, ExtractingEnvironmentDictionary } from '../tradeskill-manager';

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

                client.tradeskillmanager.extracting.queue = [];

                for (const environment in client.tradeskillmanager.extracting.environments) {
                    if (client.gmcpservice.latest['Room.Info']?.environment === environment) {
                        const toExtract: string[] = client.tradeskillmanager.extracting.environments[<keyof ExtractingEnvironmentDictionary>environment];

                        toExtract.forEach(extractable => {
                            client.tradeskillmanager.extracting.queue.push(`extract ${extractable}`);

                            client.tradeskillmanager.extracting.running = true;
                        });
                        break;
                    }
                }

                if (client.tradeskillmanager.extracting.running) {
                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
                else if (client.gmcpservice.latest['Room.Info']?.environment) {
                    display_notice(`Tradeskill Manager: Found nothing to extract from '${client.gmcpservice.latest['Room.Info']?.environment}'.`, '#FF0000');
                }
            }
        )
    ]
);
