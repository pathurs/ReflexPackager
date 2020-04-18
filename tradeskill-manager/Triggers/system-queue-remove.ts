
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { TradeskillManagerClient } from '../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const systemQueueRemove = new TriggerItem(
    'System Queue Remove',
    [
        /^\[System\]: Running queued eqbal command: ([\w\W]+)$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.harvesting.running
                    || client.tradeskillmanager.extracting.running
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



