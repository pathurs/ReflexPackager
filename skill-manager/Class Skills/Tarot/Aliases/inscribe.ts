import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient, SkillManagerTarotInscribingQueue } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const inscribe = new AliasItem(
    'Inscribe',
    /^inscribe (\d+) (\w+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: AliasFunctionArgs & { 1: string; 2: string }) {
                const amount = Number(args[1]);
                const card = <keyof SkillManagerTarotInscribingQueue>args[2];

                if (!client.skillManager.skills.class.tarot.cards.includes(card)) {
                    client.skillManager.error(`Unknown tarot card '${card}'.`);

                    return;
                }

                if (!amount || amount < 0) {
                    client.skillManager.error(`Unexpected amount '${amount}'.`);

                    return;
                }

                client.skillManager.skills.class.tarot.inscribing.queue[card] += amount;

                const total = client.skillManager.skills.class.tarot.inscribing.queue[card];

                client.skillManager.echo(
                    `Added %lightgray%${amount} ${card} ${amount > 1 ? 'cards' : 'card'}%end% to inscribing queue, to make a total of %lightgray%${total} ${card} ${total > 1 ? 'cards' : 'card'}%end%.`
                );

                if (!client.skillManager.skills.class.tarot.inscribing.active) {
                    client.skillManager.skills.class.tarot.inscribing.start();
                }
            }
        )
    ]
);
