import { ExecuteScriptAction, MultiTriggerItem } from '../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const cantGather = new MultiTriggerItem(
    'Can\'t Gather',
    [
        /^You carefully dig through the soft soil of the riverbed but are unable to find any suitable clay\.$/,
        /^You carefully search the cracks and crevices of the surrounding rock, but find nothing\.$/,
        /^Exactly where do you see farmland around here to gather from\?/,
        /^You have already gathered from that plant recently\.$/,
        /^That plant has been fully harvested\.$/,
        /^What do you wish to harvest\?/,
        /^What would you like to gather\?/,
        /^This location will not yield \w+\.$/
    ],
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillmanager.collecting.active) {
                    gag_current_line();
                }
            }
        )
    ]
);



