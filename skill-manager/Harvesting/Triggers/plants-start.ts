import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
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
                if (client.skillmanager.collecting.active) {
                    gag_current_line();

                    setTimeout(() => {
                        client.skillmanager.collecting.waitingForPlants = false;

                        client.skillmanager.collecting.tryCollect();
                    });
                }
            }
        )
    ]
);



