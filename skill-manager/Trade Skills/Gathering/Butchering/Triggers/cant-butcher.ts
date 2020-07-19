import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const cantButcher = new TriggerItem(
    'Can\'t Butcher',
    [
        /^Butcher with what? Your fingernails\?$/,
        /^Butcher what\?$/,
        /^You have no corpse suitable for butchering\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.skills.trade.gathering.butchering.running) {
                    gag_current_line();

                    client.skillManager.skills.trade.gathering.butchering.stop();
                }
            }
        )
    ]
);



