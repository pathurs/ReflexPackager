import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient, } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const inscribeFailed = new TriggerItem(
    'Inscribe Failed',
    /^Your concentration ruined, you throw away the half-finished and now worthless tarot\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.tarot.inscribing.active) {
                    gag_current_line();

                    client.skillManager.error('Inscribing failed!');

                    client.skillManager.tarot.inscribing.runningQueue = false;

                    client.skillManager.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);



