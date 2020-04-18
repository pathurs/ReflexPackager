import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { TradeskillManagerClient } from '../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const extracted = new TriggerItem(
    'Extracted',
    [
        /^You kneel and collect chunks of earth, using a strong\-smelling solvent to pull (a group of \d+ |an |a |some |\d+ )?([\w\W]+) from the dirt and rock\. This delicate process completed, you set the minerals aside to dry\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.extracting.running) {
                    run_function('tradeskill-manager:inrift', args, 'Tradeskill Manager');

                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
            }
        )
    ]
);



