import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { TradeskillManagerClient } from '../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const milled = new TriggerItem(
    'Milled',
    [
        /^With a satisfying rattle, you note that the milling is complete as the fruit of your labours drops into the opening at the base of the mill\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.inkmilling.running) {
                    send_command(`get group ink from mill|get ink from mill|inrift 50 ink`, 1);

                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
            }
        )
    ]
);



