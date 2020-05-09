import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
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
                if (client.skillmanager.collecting.active) {
                    gag_current_line();

                    setTimeout(() => {
                        client.skillmanager.collecting.waitingForMinerals = false;

                        client.skillmanager.collecting.tryCollect();
                    });
                }
            }
        )
    ]
);



