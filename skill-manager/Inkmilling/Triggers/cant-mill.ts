import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const cantMill = new TriggerItem(
    'Can\'t Mill',
    [
        /^Your mill does not hold the required amount of reagents to mill that\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillmanager.inkmilling.running) {
                    gag_current_line();

                    client.skillmanager.inkmilling.queue = [];
                    client.skillmanager.inkmilling.running = false;

                    send_command('get 50 reagent from mill|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent', 1);

                    client.skillmanager.error('Ran out of reagents. Queue has been cleared.');
                }


                client.skillmanager.runQueue();
            }
        )
    ]
);



