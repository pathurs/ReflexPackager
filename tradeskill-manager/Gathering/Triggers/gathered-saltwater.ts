import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const gatheredSaltwater = new TriggerItem(
    'Gathered Saltwater',
    /^Using your acute sight, you examine the surrounding sea\. You spot a sparkling patch of pure saltwater, free of impurities, and catch it in [\w\W]+\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.gathering.running) {
                    client.tradeskillmanager.inrift([args[0], undefined, 'sips of saltwater']);
                    client.tradeskillmanager.runQueue();
                }
            }
        )
    ]
);



