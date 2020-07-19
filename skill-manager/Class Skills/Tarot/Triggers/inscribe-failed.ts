import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient, } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const inscribeFailed = new TriggerItem(
    'Inscribe Failed',
    /^Your concentration ruined, you throw away the half-finished and now worthless tarot\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillManager.skills.class.tarot.active) {
                    client.skillManager.onAbility('tarot', 'CHANGEME', 'CHANGEME', 'CHANGEME', args);
                }

                if (client.skillManager.skills.class.tarot.inscribing.active) {
                    gag_current_line();

                    client.skillManager.error('Inscribing failed!');

                    client.skillManager.skills.class.tarot.inscribing.runningQueue = false;

                    client.skillManager.skills.class.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);
