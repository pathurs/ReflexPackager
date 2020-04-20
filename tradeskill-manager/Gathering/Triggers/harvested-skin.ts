import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const harvestedSkin = new TriggerItem(
    'Harvested Skin',
    [
        /^You reach down and carefully peel off two long strips of skin from the dead sidewinder\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                run_function('tradeskill-manager:inrift', [args[0], '2', 'sidewinder skins'], 'Tradeskill Manager');

                run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
            }
        )
    ]
);
