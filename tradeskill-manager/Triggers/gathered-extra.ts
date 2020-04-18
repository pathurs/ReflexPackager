import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { TradeskillManagerClient } from '../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const gatheredExtra = new TriggerItem(
    'Gathered Extra',
    [
        /^As you cleanse the clay in the riverwater, you discover (a group of \d+ |an |a |some |\d+ )?([\w\W]+) hidden by the silt\.$/,
        /^With your keen eyes, you spot some additional edibles and you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+) to supplement your collection\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                run_function('tradeskill-manager:inrift', args, 'Tradeskill Manager');
            }
        )
    ]
);



