import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const gatheredMilk = new TriggerItem(
    'Gathered Milk',
    /^Spotting a cow whose udder hangs low to the ground, you kneel beside her, gently coaxing her milk into [\w\W]+\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.gathering.running) {
                    client.tradeskillmanager.inrift([args[0], undefined, 'sips of milk']);
                    client.tradeskillmanager.runQueue();
                }
            }
        )
    ]
);



