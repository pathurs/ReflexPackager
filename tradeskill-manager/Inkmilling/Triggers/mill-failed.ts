import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const millFailed = new TriggerItem(
    'Mill Failed',
    [
        /^Lacking the rattle of a successful milling, you realise that you've done something wrong and spoiled the batch, which you empty onto the ground in disgust\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.inkmilling.running) {
                    client.tradeskillmanager.echo('Inkmilling failed!');

                    client.tradeskillmanager.runQueue();
                }
            }
        )
    ]
);



