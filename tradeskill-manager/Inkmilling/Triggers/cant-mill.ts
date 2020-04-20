import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const cantMill = new TriggerItem(
    'Can\'t Mill',
    [
        /^Your mill does not hold the required amount of reagents to mill that\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.tradeskillmanager.inkmilling.running) {
                    gag_current_line();

                    client.tradeskillmanager.inkmilling.queue = [];
                    client.tradeskillmanager.inkmilling.running = false;

                    send_command('get 50 reagent from mill|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent', 1);

                    display_notice('Tradeskill Manager: Ran out of reagents. Queue has been cleared.', '#FF0000');
                }


                run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
            }
        )
    ]
);



