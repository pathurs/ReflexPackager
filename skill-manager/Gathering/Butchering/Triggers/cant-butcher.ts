import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const cantButcher = new MultiTriggerItem(
    'Can\'t Butcher',
    [
        /^Butcher with what? Your fingernails\?$/,
        /^Butcher what\?$/,
        /^You have no corpse suitable for butchering\.$/
    ],
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillmanager.gathering.butchering.active) {
                    gag_current_line();

                    client.skillmanager.gathering.butchering.stop();
                }
            }
        )
    ]
);



