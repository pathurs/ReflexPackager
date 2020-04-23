import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const butchered = new TriggerItem(
    'Butchered',
    /^Skilfully, you butcher the corpse of [\w\W]+, separating flesh from bone with your cleaver and preparing (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.butchering.running) {
                    client.tradeskillmanager.inrift(args);

                    client.tradeskillmanager.butchering.queue.push('butcher corpse for reagent');

                    client.tradeskillmanager.runQueue();
                }
            }
        )
    ]
);



