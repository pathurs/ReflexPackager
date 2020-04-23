import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient, InkmillingInks } from '../../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const mill = new AliasItem(
    'Mill',
    /^mill (\d+) (\w+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: AliasFunctionArgs) {
                const total = Number(args[1]);
                const colour = args[2];

                const inkReagents: InkmillingInks[keyof InkmillingInks] | undefined = client.tradeskillmanager.inkmilling.inks[<keyof InkmillingInks>colour];

                if (!inkReagents) {
                    client.tradeskillmanager.error(`Unknown ink colour '${colour}'.`);

                    return;
                }

                if (!total || total < 0) {
                    client.tradeskillmanager.error(`Unexpected amount '${total}'.`);

                    return;
                }

                for (let i = 0; i < total; i += 5) {
                    const amount = i + 5 > total ? total - i : 5;

                    client.tradeskillmanager.inkmilling.queue.push(`${amount} ${colour}`);
                }

                client.tradeskillmanager.inkmilling.running = true;

                client.tradeskillmanager.runQueue();
            }
        )
    ]
);
