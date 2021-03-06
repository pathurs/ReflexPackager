import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const milled = new TriggerItem(
    'Milled',
    /^With a satisfying rattle, you note that the milling is complete as the fruit of your labours drops into the opening at the base of the mill\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.skills.trade.inkmilling.running) {
                    client.systemService.sendCommand(`get group ink from mill|get ink from mill|inrift all ink`);

                    client.skillManager.skills.trade.inkmilling.runningQueue = false;

                    client.skillManager.skills.trade.inkmilling.runQueue();
                }
            }
        )
    ]
);



