import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const inscribeStop = new AliasItem(
    'Inscribe Stop',
    /^inscribe stop$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillmanager.tarot.inscribing.running = false;

                client.skillmanager.echo('Inscribing stopprd.');
            }
        )
    ]
);
