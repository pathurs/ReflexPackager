import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: SkillManagerClient & GMCPServiceClient;

export const plantsStart = new TriggerItem(
    'Plants Start',
    /^The following plants are growing in this room:$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.skills.trade.collecting.running) {
                    gag_current_line();

                    setTimeout(() => {
                        client.skillManager.skills.trade.collecting.waitingForPlants = false;

                        client.skillManager.skills.trade.collecting.tryCollect();
                    });
                }
            }
        )
    ]
);



