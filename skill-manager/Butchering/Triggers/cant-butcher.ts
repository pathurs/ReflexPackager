import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const cantButcher = new TriggerItem(
    'Can\'t Butcher',
    [
        /^Butcher with what? Your fingernails\?$/,
        /^Butcher what\?$/,
        /^You have no corpse suitable for butchering\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillmanager.butchering.running) {
                    gag_current_line();
                }

                client.skillmanager.runQueue();
            }
        )
    ]
);



