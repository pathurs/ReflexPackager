import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const cantMill = new TriggerItem(
    'Can\'t Mill',
    /^Your mill does not hold the required amount of reagents to mill that\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.skills.trade.inkmilling.running) {
                    gag_current_line();

                    client.systemService.sendCommand('get 50 reagent from mill|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent');

                    client.skillManager.skills.trade.inkmilling.stop();
                    client.skillManager.skills.trade.inkmilling.reset();

                    client.skillManager.error('Ran out of reagents. Queue has been cleared.');
                }
            }
        )
    ]
);



