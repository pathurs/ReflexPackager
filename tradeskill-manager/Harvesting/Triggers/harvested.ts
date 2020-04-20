import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const harvested = new TriggerItem(
    'Harvested',
    [
        /^You reach out and carefully harvest (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.harvesting.running) {
                    run_function('tradeskill-manager:inrift', args, 'Tradeskill Manager');

                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
            }
        )
    ]
);



