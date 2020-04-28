import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient, } from '../../skill-manager';

declare const client: SkillManagerClient;

export const inscribeFailed = new TriggerItem(
    'Inscribe Failed',
    [
        /^Your concentration ruined, you throw away the half-finished and now worthless tarot\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillmanager.tarot.inscribing.running) {
                    gag_current_line();

                    client.skillmanager.error('Inscribing failed!');

                    client.skillmanager.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);



