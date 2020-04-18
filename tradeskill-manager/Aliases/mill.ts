import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { TradeskillManagerClient, InkmillingInks } from '../tradeskill-manager';
import { InventoryManagerClient } from '../../inventory-manager/inventory-manager'

declare const client: TradeskillManagerClient & InventoryManagerClient;

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
                    display_notice(`Tradeskill Manager: Unknown ink colour '${colour}'.`, '#FF0000');

                    return;
                }

                if (!total || total < 0) {
                    display_notice(`Tradeskill Manager: Unexpected amount '${total}'.`, '#FF0000');

                    return;
                }

                for (let i = 0; i < total; i += 5) {
                    const amount = i + 5 > total ? total - i : 5;

                    client.tradeskillmanager.inkmilling.queue.push(`${amount} ${colour}`);
                }

                client.tradeskillmanager.inkmilling.running = true;

                run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
            }
        )
    ]
);
