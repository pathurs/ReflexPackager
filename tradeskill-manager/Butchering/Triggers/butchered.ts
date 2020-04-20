import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const butchered = new TriggerItem(
    'Butchered',
    [
        /^Skilfully, you butcher the corpse of [\w\W]+, separating flesh from bone with your cleaver and preparing (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^As you set about butchering the corpse, you realise you have made a mistake and mutilated it beyond redemption\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.tradeskillmanager.butchering.running) {
                    run_function('tradeskill-manager:inrift', args, 'Tradeskill Manager');

                    client.tradeskillmanager.butchering.queue.push('butcher corpse for reagents');

                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
            }
        )
    ]
);



