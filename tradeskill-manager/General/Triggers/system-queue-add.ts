
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const systemQueueAdd = new TriggerItem(
    'System Queue Add',
    [
        /^\[System\]: Added ([\w\W]+) to your eqbal queue\.$/,
        /^([\w\W]+) was added to your balance queue\.$'/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.harvesting.running
                    || client.tradeskillmanager.transmutation.running
                    || client.tradeskillmanager.gathering.running
                    || client.tradeskillmanager.butchering.running
                    || client.tradeskillmanager.inkmilling.running
                ) {
                    gag_current_line();
                }
            }
        )
    ]
);



