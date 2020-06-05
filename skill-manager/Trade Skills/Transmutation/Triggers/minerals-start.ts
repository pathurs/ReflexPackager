import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: SkillManagerClient & GMCPServiceClient;

export const mineralsStart = new TriggerItem(
    'Minerals Start',
    /^You spot the following minerals here:$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.collecting.active) {
                    gag_current_line();

                    setTimeout(() => {
                        client.skillManager.collecting.waitingForMinerals = false;

                        client.skillManager.collecting.tryCollect();
                    });
                }
            }
        )
    ]
);



