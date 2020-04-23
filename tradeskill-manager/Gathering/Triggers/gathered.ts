import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const gathered = new TriggerItem(
    'Gathered',
    [
        /^You reach out and carefully harvest (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^Sifting through the soft riverbed with your fingers, you collect (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^Carefully scouring the nooks and crannies of the surrounding rock, you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^You scour the farmland and find a rudimentary nest, from which you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^Using your acute sight, you examine the surrounding sea\. You spot a sparkling patch of pure saltwater, free of impurities, and catch it in a tourmaline vial\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.gathering.running) {
                    client.tradeskillmanager.inrift(args);
                    client.tradeskillmanager.runQueue();
                }
            }
        )
    ]
);



