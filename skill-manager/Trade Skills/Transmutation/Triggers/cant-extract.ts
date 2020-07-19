import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const cantExtract = new TriggerItem(
    'Can\'t Extract',
    [
        /^You carefully search the cracks and crevices of the surrounding rock, but find nothing\.$/,
        /^What do you wish to extract\?/,
        /^This location's extractable \w+ has been exhausted\.$/,
        /^This location will not yield \w+\.$/,
        /^You have already extracted minerals from this location\.$/,
        /^The environment here will not yield any minerals\.$/
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



