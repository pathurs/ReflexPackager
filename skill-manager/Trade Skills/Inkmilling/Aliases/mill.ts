import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient, SkillManagerInkmillingQueue } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const mill = new AliasItem(
    'Mill',
    /^mill (\d+) (\w+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: AliasFunctionArgs & { 1: string; 2: string }) {
                const amount = Number(args[1]);
                const colour = args[2];

                if (!(colour in client.skillManager.inkmilling.queue)) {
                    client.skillManager.error(`Unknown ink colour '${colour}'.`);

                    return;
                }

                if (!amount || amount < 0) {
                    client.skillManager.error(`Unexpected amount '${amount}'.`);

                    return;
                }

                client.skillManager.inkmilling.queue[<keyof SkillManagerInkmillingQueue>colour] += amount;

                const total = client.skillManager.inkmilling.queue[<keyof SkillManagerInkmillingQueue>colour];

                client.skillManager.echo(
                    `Added %lightgray%${amount} ${colour} ${amount > 1 ? 'inks' : 'ink'}%end% to inkmilling queue, to make a total of %lightgray%${total} ${colour} ${total > 1 ? 'inks' : 'ink'}%end%.`
                );

                if (!client.skillManager.inkmilling.active) {
                    client.skillManager.inkmilling.start();
                }
            }
        )
    ]
);
