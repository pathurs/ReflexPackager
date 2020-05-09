import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient, SkillManagerInkmillingInks } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const mill = new AliasItem(
    'Mill',
    /^mill (\d+) (\w+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: AliasFunctionArgs) {
                const amount = Number(args[1]);
                const colour = args[2];

                const inkReagents: SkillManagerInkmillingInks[keyof SkillManagerInkmillingInks] | undefined = client.skillmanager.inkmilling.inks[<keyof SkillManagerInkmillingInks>colour];

                if (!inkReagents) {
                    client.skillmanager.error(`Unknown ink colour '${colour}'.`);

                    return;
                }

                if (!amount || amount < 0) {
                    client.skillmanager.error(`Unexpected amount '${amount}'.`);

                    return;
                }

                for (let i = 0; i < amount; i += 5) {
                    const groupAmount = i + 5 > amount ? amount - i : 5;

                    client.skillmanager.inkmilling.queue.push(`${groupAmount} ${colour}`);
                }

                client.skillmanager.inkmilling.runningQueue = true;

                client.skillmanager.inkmilling.runQueue();

                client.skillmanager.echo(`Started milling.`);
            }
        )
    ]
);
