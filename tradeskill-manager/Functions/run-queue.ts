import { FunctionItem } from '../../source';
import { TradeskillManagerClient, InkmillingInks, InkmillingReagents } from '../tradeskill-manager';

declare const client: TradeskillManagerClient;

export const runQueue = new FunctionItem(
    'tradeskill-manager:run-queue',
    function () {
        if (client.tradeskillmanager.running) {
            return;
        }
        else {
            client.tradeskillmanager.running = true;

            setTimeout(function () {
                client.tradeskillmanager.running = false;
            });
        }

        if (client.tradeskillmanager.harvesting.running) {
            if (client.tradeskillmanager.harvesting.queue.length > 0) {
                // display_notice(`Tradeskill Manager: Harvesting Queue: ${client.tradeskillmanager.harvesting.queue.join(', ')}`, '#00FF00');

                const command = client.tradeskillmanager.harvesting.queue.pop();

                if (command) {
                    send_command(`queue add eqbal ${command}`);

                    return;
                }
            }
            else {
                display_notice(`Tradeskill Manager: Harvesting Complete!`, '#00FF00');

                client.tradeskillmanager.harvesting.running = false;
            }
        }

        if (client.tradeskillmanager.extracting.running) {
            if (client.tradeskillmanager.extracting.queue.length > 0) {
                // display_notice(`Tradeskill Manager: Extracting Queue: ${client.tradeskillmanager.extracting.queue.join(', ')}`, '#00FF00');

                const command = client.tradeskillmanager.extracting.queue.pop();

                if (command) {
                    send_command(`queue add eqbal ${command}`);

                    return;
                }
            }
            else {
                display_notice(`Tradeskill Manager: Extracting Complete!`, '#00FF00');

                client.tradeskillmanager.extracting.running = false;
            }
        }


        if (client.tradeskillmanager.gathering.running) {
            if (client.tradeskillmanager.gathering.queue.length > 0) {
                // display_notice(`Tradeskill Manager: Gathering Queue: ${client.tradeskillmanager.gathering.queue.join(', ')}`, '#00FF00');

                const command = client.tradeskillmanager.gathering.queue.pop();

                if (command) {
                    send_command(`queue add eqbal ${command}`);

                    return;
                }
            }
            else {
                display_notice(`Tradeskill Manager: Gathering Complete!`, '#00FF00');

                client.tradeskillmanager.gathering.running = false;
            }
        }

        if (client.tradeskillmanager.butchering.running) {
            if (client.tradeskillmanager.butchering.queue.length > 0) {
                // display_notice(`Tradeskill Manager: Butchering Queue: ${client.tradeskillmanager.butchering.queue.join(', ')}`, '#00FF00');

                const command = client.tradeskillmanager.butchering.queue.pop();

                if (command) {
                    send_command(`queue add eqbal ${command}`);

                    return;
                }
            }
            else {
                display_notice(`Tradeskill Manager: Butchering Complete!`, '#00FF00');

                client.tradeskillmanager.butchering.running = false;
            }
        }

        if (client.tradeskillmanager.inkmilling.running) {
            if (client.tradeskillmanager.inkmilling.queue.length > 0) {
                // display_notice(`Tradeskill Manager: Inkmilling Queue: ${client.tradeskillmanager.inkmilling.queue.join(', ')}`, '#00FF00');

                const next = client.tradeskillmanager.inkmilling.queue.pop();
                const match = next?.match(/(\d+) (\w+)/) || [];
                const amount = Number(match[1]);
                const colour = match[2];

                if (!amount || !colour) {
                    return;
                }

                const inkReagents: InkmillingInks[keyof InkmillingInks] | undefined = client.tradeskillmanager.inkmilling.inks[<keyof InkmillingInks>colour];

                const outriftCommands: string[] = [];
                const putInMillCommands: string[] = [];

                for (let inkReagent in inkReagents) {
                    const reagentAmount = amount * inkReagents[<keyof typeof inkReagents>inkReagent];
                    const reagents = client.tradeskillmanager.inkmilling.reagents[<keyof InkmillingReagents>inkReagent];
                    // Actually check rift
                    const reagent = reagents[0];


                    if (reagentAmount === 1) {
                        outriftCommands.push(`outrift ${reagent}`);
                        putInMillCommands.push(`put ${reagent} in mill`);
                    }
                    else {
                        outriftCommands.push(`outrift ${reagentAmount} ${reagent}`);
                        putInMillCommands.push(`put group ${reagent} in mill`);
                    }
                }

                send_command(outriftCommands.join('|'), 1);
                send_command(putInMillCommands.join('|'), 1);
                send_command(`mill for ${amount} ${colour}`, 1);

            }
            else {
                display_notice(`Tradeskill Manager: Inkmilling Complete!`, '#00FF00');

                client.tradeskillmanager.inkmilling.running = false;
            }
        }
    }
);
