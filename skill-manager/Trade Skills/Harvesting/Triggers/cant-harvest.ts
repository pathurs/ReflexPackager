import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const cantHarvest = new TriggerItem(
    'Can\'t Harvest',
    [
        /^You carefully dig through the soft soil of the riverbed but are unable to find any suitable clay\.$/,
        /^You carefully search the cracks and crevices of the surrounding rock, but find nothing\.$/,
        /^You have already harvested from this plant recently\.$/,
        /^That plant has been fully harvested\.$/,
        /^What do you wish to harvest\?/,
        /^What would you like to gather\?/,
        /^This location will not yield \w+\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.skills.trade.collecting.running) {
                    gag_current_line();
                }
            }
        )
    ]
);



