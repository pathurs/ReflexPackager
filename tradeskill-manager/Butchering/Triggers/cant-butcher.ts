import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const cantButcher = new TriggerItem(
    'Can\'t Butcher',
    [
        /^Butcher with what? Your fingernails\?$/,
        /^Butcher what\?$/,
        /^You have no corpse suitable for butchering\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.butchering.running) {
                    gag_current_line();
                }

                run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
            }
        )
    ]
);



