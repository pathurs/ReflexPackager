import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const cantHarvest = new TriggerItem(
    'Can\'t Harvest',
    [
        /^You carefully dig through the soft soil of the riverbed but are unable to find any suitable clay\.$/,
        /^You carefully search the cracks and crevices of the surrounding rock, but find nothing\.$/,
        /^You have already harvested from this plant recently\.$/,
        /^That plant has been fully harvested\.$/,
        /^What do you wish to harvest\?/,
        /^What would you like to gather\?/,
        /^This location will not yield \w+\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.harvesting.running) {
                    gag_current_line();
                }

                run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
            }
        )
    ]
);



