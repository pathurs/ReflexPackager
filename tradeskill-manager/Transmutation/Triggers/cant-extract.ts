import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const cantExtract = new TriggerItem(
    'Can\'t Extract',
    [
        /^You carefully search the cracks and crevices of the surrounding rock, but find nothing\.$/,
        /^What do you wish to extract\?/,
        /^This location's extractable \w+ has been exhausted\.$/,
        /^This location will not yield \w+\.$/,
        /^You have already extracted minerals from this location\.$/,
        /^The environment here will not yield any minerals\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.transmutation.running) {
                    gag_current_line();
                }

                run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
            }
        )
    ]
);



