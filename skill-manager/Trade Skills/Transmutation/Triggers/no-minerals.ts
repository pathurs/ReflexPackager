import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: SkillManagerClient & GMCPServiceClient;

export const noMinerals = new TriggerItem(
    'No Minerals',
    /^There are no minerals here\.$/,
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



