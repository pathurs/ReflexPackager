import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const butcherFailed = new TriggerItem(
    'Butcher Failed',
    /^As you set about butchering the corpse, you realise you have made a mistake and mutilated it beyond redemption\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.butchering.running) {
                    client.tradeskillmanager.butchering.queue.push('butcher corpse for reagent');

                    client.tradeskillmanager.runQueue();
                }
            }
        )
    ]
);



