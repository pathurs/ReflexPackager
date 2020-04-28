import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient, TarotCard, } from '../../skill-manager';

declare const client: SkillManagerClient;

export const inscribe = new AliasItem(
    'Inscribe',
    /^inscribe (\d+) (\w+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: AliasFunctionArgs & { 1: string; 2: string }) {
                const amount = Number(args[1]);
                const card = <Exclude<TarotCard, 'blank'>>args[2];

                if (!client.skillmanager.tarot.cards.includes(card)) {
                    client.skillmanager.error(`Unknown tarot card '${card}'.`);

                    return;
                }

                if (!amount || amount < 0) {
                    client.skillmanager.error(`Unexpected amount '${amount}'.`);

                    return;
                }

                client.skillmanager.tarot.inscribing.queue[card] += amount;

                const total = client.skillmanager.tarot.inscribing.queue[card];

                client.skillmanager.echo(
                    `Added %white%${amount} ${card} ${amount > 1 ? 'cards' : 'card'}%end% to inscribing queue, to make a total of %white%${total} ${card} ${total > 1 ? 'cards' : 'card'}%end%.`
                );

                const alreadyRunning = client.skillmanager.tarot.inscribing.running;

                if (!alreadyRunning) {
                    client.skillmanager.tarot.inscribing.running = true;

                    client.skillmanager.tarot.inscribing.runQueue();

                    client.skillmanager.echo('Inscribing started.')
                }
            }
        )
    ]
);
