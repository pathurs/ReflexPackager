import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const inscribeClear = new AliasItem(
    'Inscribe Clear',
    /^inscribe clear$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillmanager.tarot.inscribing.running = false;

                client.skillmanager.tarot.inscribing.queue = {
                    sun: 0,
                    emperor: 0,
                    magician: 0,
                    priestess: 0,
                    fool: 0,
                    chariot: 0,
                    hermit: 0,
                    empress: 0,
                    lovers: 0,
                    hierophant: 0,
                    hangedman: 0,
                    tower: 0,
                    wheel: 0,
                    creator: 0,
                    justice: 0,
                    star: 0,
                    aeon: 0,
                    lust: 0,
                    universe: 0,
                    devil: 0,
                    moon: 0,
                    death: 0
                };

                client.skillmanager.echo('Inscribing stopped.');
                client.skillmanager.echo('Inscribing queue cleared.');
            }
        )
    ]
);
