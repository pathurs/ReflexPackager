
import { FunctionItem } from '../source';
import {
    TradeskillManagerClient,
    HarvestingNamesDictionary,
    TransmutationNamesDictionary,
    GatheringNamesDictionary,
    ButcheringNamesDictionary,
    InkmillingNamesDictionary,
    InkmillingInks,
    InkmillingReagents
} from './tradeskill-manager';
import { InventoryManagerClient } from '../inventory-manager/inventory-manager';
import { DisplayServiceClient } from '../display-service/display-service';

declare const client: TradeskillManagerClient & InventoryManagerClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.tradeskillmanager = {
            enabled: true,
            running: false,
            harvesting: {
                enabled: true,
                queue: [],
                running: false,
                environments: {
                    Forest: ['elm', 'ginger', 'ginseng', 'lobelia', 'myrrh', 'echinacea', 'burdock'],
                    Garden: ['echinacea', 'elm', 'ginger', 'ginseng', 'lobelia', 'myrrh'],
                    Desert: ['pear', 'weed'],
                    Grasslands: ['goldenseal', 'slipper'],
                    Mountains: ['valerian', 'blueberry'],
                    Jungle: ['kuzu', 'kola', 'skullcap'],
                    'Natural underground': ['moss', 'bloodroot'],
                    Hills: ['bayberry', 'hawthorn'],
                    Swamp: ['ash', 'cohosh', 'bellwort'],
                    Valley: ['sileris'],
                    Freshwater: ['kelp'],
                    River: ['kelp'],
                    Water: ['kelp'],
                    Ocean: ['kelp']
                },
                names: {
                    'bayberry bark': 'bayberry',
                    'pieces of bayberry bark': 'bayberry',
                    'bellwort flower': 'bellwort',
                    'bellwort flowers': 'bellwort',
                    'dark burdock root': 'burdock',
                    'burdock roots': 'burdock',
                    'black cohosh root': 'cohosh',
                    'cohosh roots': 'cohosh',
                    'bloodroot leaf': 'bloodroot',
                    'bloodroot leaves': 'bloodroot',
                    'echinacea root': 'echinacea',
                    'echinacea roots': 'echinacea',
                    'ginger root': 'ginger',
                    'ginger roots': 'ginger',
                    'ginseng root': 'ginseng',
                    'ginseng roots': 'ginseng',
                    'goldenseal root': 'goldenseal',
                    'goldenseal roots': 'goldenseal',
                    'hawthorn berry': 'hawthorn',
                    'hawthorn berries': 'hawthorn',
                    'irid moss': 'moss',
                    'pieces of irid moss': 'moss',
                    'piece of kelp': 'kelp',
                    'pieces of kelp': 'kelp',
                    'kola nut': 'kola',
                    'kola nuts': 'kola',
                    'kuzu root': 'kuzu',
                    'kuzu roots': 'kuzu',
                    'lady\'s slipper root': 'slipper',
                    'lady\'s slipper roots': 'slipper',
                    'ball of myrrh gum': 'myrrh',
                    'myrrh balls': 'myrrh',
                    'lobelia seed': 'lobelia',
                    'lobelia seeds': 'lobelia',
                    'prickly ash bark': 'ash',
                    'pieces of prickly ash bark': 'ash',
                    'sileris berry': 'sileris',
                    'sileris berries': 'sileris',
                    'skullcap flower': 'skullcap',
                    'skullcap flowers': 'skullcap',
                    'slippery elm': 'elm',
                    'slippery elms': 'elm',
                    'valerian leaf': 'valerian',
                    'valerian leaves': 'valerian',
                    'sprig of cactus weed': 'weed',
                    'sprigs of cactus weed': 'weed',
                    'prickly pear': 'pear',
                    'prickly pears': 'pear'
                }
            },
            transmutation: {
                enabled: true,
                queue: [],
                running: false,
                environments: {
                    'Constructed underground': ['bisemutum', 'calamine', 'dolomite', 'potash'],
                    'Natural underground': ['argentum', 'calamine', 'dolomite', 'malachite', 'potash', 'quartz', 'stannum'],
                    'Magma Caves': ['dolomite'],
                    Mountains: ['antimony', 'calcite', 'malachite', 'potash', 'quartz']
                },
                names: {
                    'antimony flake': 'antimony',
                    'antimony flakes': 'antimony',
                    'argentum flake': 'argentum',
                    'argentum flakes': 'argentum',
                    'arsenic pellet': 'arsenic',
                    'arsenic pellets': 'arsenic',
                    'aurum flake': 'aurum',
                    'aurum flakes': 'aurum',
                    'azurite mote': 'azurite',
                    'azurite motes': 'azurite',
                    'bisemutum chip': 'bisemutum',
                    'bisemutum chips': 'bisemutum',
                    'calamine crystal': 'calamine',
                    'calamine crystals': 'calamine',
                    'calcite mote': 'calcite',
                    'calcite motes': 'calcite',
                    'pinch of ground cinnabar': 'cinnabar',
                    'pinches of ground cinnabar': 'cinnabar',
                    'cuprum flake': 'cuprum',
                    'cuprum flakes': 'cuprum',
                    'dolomite grain': 'dolomite',
                    'dolomite grains': 'dolomite',
                    'ferrum flake': 'ferrum',
                    'ferrum flakes': 'ferrum',
                    'gypsum crystal': 'gypsum',
                    'gypsum crystals': 'gypsum',
                    'magnesium chip': 'magnesium',
                    'magnesium chips': 'magnesium',
                    'pinch of ground malachite': 'malachite',
                    'pinches of ground malachite': 'malachite',
                    'plumbum flake': 'plumbum',
                    'plumbum flakes': 'plumbum',
                    'potash crystal': 'potash',
                    'potash crystals': 'potash',
                    'quartz grain': 'quartz',
                    'quartz grains': 'quartz',
                    'quicksilver droplet': 'quicksilver',
                    'quicksilver droplets': 'quicksilver',
                    'pinch of realgar crystals': 'realgar',
                    'pinches of ground realgar': 'realgar',
                    'stannum flake': 'stannum',
                    'stannum flakes': 'stannum'
                }
            },
            gathering: {
                enabled: true,
                queue: [],
                running: false,
                environments: {
                    Forest: ['nut'],
                    Garden: ['fruit', 'vegetable'],
                    Grasslands: ['sugarcane', 'grain', 'from farm'],
                    Jungle: ['fruit', 'cacao'],
                    'Natural underground': ['lumic', 'dust'],
                    Valley: ['olive'],
                    River: ['clay'],
                    Ocean: ['saltwater']
                },
                names: {
                    'assortment of vegetables': 'vegetable',
                    vegetables: 'vegetable',
                    'lump of red clay': 'clay',
                    'lumps of red clay': 'clay',
                    'handful of fruits': 'fruit',
                    'pieces of fruit': 'fruit',
                    'handful of grain': 'grain',
                    'handfuls of grain': 'grain',
                    'small brown egg': 'egg',
                    eggs: 'egg',
                    'handful of nuts': 'nut',
                    'handfuls of nuts': 'nut',
                    'cluster of olives': 'olive',
                    'large, green olives': 'olive',
                    'raw sugarcane stick': 'sugarcane',
                    'sticks of sugarcane': 'sugarcane',
                    'small patch of lumic moss': 'lumic',
                    'patches of lumic moss': 'lumic',
                    'cacao pod': 'cacao',
                    'cacao pods': 'cacao',
                    'pinch of diamond dust': 'dust',
                    'pinches of diamond dust': 'dust',
                    'bar of gold': 'goldbar',
                    'gold bars': 'goldbar',
                    'handfuls of seeds': 'seed',
                    'handful of seeds': 'seed',
                    'piles of gold flakes': 'goldflakes',
                    'pile of gold flakes': 'goldflakes',
                    'venom sac': 'sac',
                    'venom sacs': 'sac',
                    'sidewinder skin': 'skin',
                    'sidewinder skins': 'skin',
                    'sip of milk': 'milk',
                    'sips of milk': 'milk',
                    'sip of saltwater': 'saltwater',
                    'sips of saltwater': 'saltwater'
                }
            },
            butchering: {
                enabled: true,
                queue: [],
                running: false,
                names: {
                    'piece of buffalo horn': 'buffalohorn',
                    'pieces of buffalo horn': 'buffalohorn',
                    'pile of fish scales': 'scales',
                    'piles of fish scales': 'scales',
                    'pile of gold flakes': 'flakes',
                    'piles of gold flakes': 'flakes',
                    'an ink bladder': 'bladder',
                    'ink bladders': 'bladder',
                    'sliver of red scorpion chitin': 'redchitin',
                    'slivers of red chitin': 'redchitin',
                    'sliver of yellow scorpion chitin': 'yellowchitin',
                    'slivers of yellow chitin': 'yellowchitin',
                    'lump of red clay': 'clay',
                    'lumps of red clay': 'clay',
                    'shark tooth': 'tooth',
                    'shark teeth': 'tooth',
                    'wyrm tongue': 'tongue',
                    'wyrm tongues': 'tongue',
                    'chunk of animal fat': 'fat',
                    'chunks of animal fat': 'fat',
                    'fillet of fish': 'fish',
                    'pieces of fish': 'fish',
                    'tender cut of meat': 'meat',
                    'pieces of meat': 'meat',
                    'poultry breast': 'poultry',
                    'pieces of poultry': 'poultry',
                    'unprocessed animal skin': 'skin',
                    'skins': 'skin'
                }
            },
            inkmilling: {
                enabled: true,
                queue: [],
                running: false,
                mill: {
                    // TODO: Let user set id
                    id: client.inventorymanager.items.find(item => item.name.includes('mill'))?.id
                },
                reagents: {
                    red: ['clay', 'redchitin'],
                    blue: ['bladder', 'lumic'],
                    yellow: ['yellowchitin'],
                    gold: ['goldflakes'],
                    common: ['scales'],
                    uncommon: ['buffalohorn'],
                    scarce: ['tooth'],
                    rare: ['tongue']
                },
                inks: {
                    red: {
                        red: 1,
                        common: 1
                    },
                    blue: {
                        blue: 1,
                        uncommon: 1
                    },
                    yellow: {
                        yellow: 1,
                        scarce: 1
                    },
                    green: {
                        blue: 2,
                        yellow: 1,
                        uncommon: 2,
                        scarce: 1
                    },
                    purple: {
                        red: 2,
                        blue: 2,
                        common: 2,
                        uncommon: 2,
                        rare: 1
                    },
                    gold: {
                        gold: 1,
                        common: 2,
                        uncommon: 2,
                        scarce: 2,
                        rare: 1
                    },
                    black: {
                        red: 1,
                        blue: 1,
                        yellow: 1,
                        gold: 1,
                        common: 2,
                        uncommon: 2,
                        scarce: 2,
                        rare: 3
                    }
                },
                names: {
                    'red ink': 'redink',
                    'red inks': 'redink',
                    'blue ink': 'blueink',
                    'blue inks': 'blueink',
                    'yellow ink': 'yellowink',
                    'yellow inks': 'yellowink',
                    'green ink': 'greenink',
                    'green inks': 'greenink',
                    'purple ink': 'purpleink',
                    'purple inks': 'purpleink',
                    'gold ink': 'goldink',
                    'gold inks': 'goldink',
                    'black ink': 'blackink',
                    'black inks': 'blackink'
                }
            },
            echo(text) {
                client.displayservice.echo(`%white%[%reset%%deepskyblue%Tradeskill Manager%reset%%white%]:%reset% ${client.displayservice.colorify(text)}`);
            },
            error(text) {
                client.tradeskillmanager.echo(`%red%${text}`);
            },
            runQueue() {
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
                        // client.tradeskillmanager.echo(`Harvesting Queue: ${client.tradeskillmanager.harvesting.queue.join(', ')}`);

                        const command = client.tradeskillmanager.harvesting.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        client.tradeskillmanager.echo(`Harvesting Complete!`);

                        client.tradeskillmanager.harvesting.running = false;
                    }
                }

                if (client.tradeskillmanager.transmutation.running) {
                    if (client.tradeskillmanager.transmutation.queue.length > 0) {
                        // client.inventotradeskillmanagerrymanager.echo(`${client.tradeskillmanager.transmutation.queue.join(', ')}`);

                        const command = client.tradeskillmanager.transmutation.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        client.tradeskillmanager.echo(`Transmutation Complete!`);

                        client.tradeskillmanager.transmutation.running = false;
                    }
                }


                if (client.tradeskillmanager.gathering.running) {
                    if (client.tradeskillmanager.gathering.queue.length > 0) {
                        // client.tradeskillmanager.echo(`Gathering Queue: ${client.tradeskillmanager.gathering.queue.join(', ')}`);

                        const command = client.tradeskillmanager.gathering.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        client.tradeskillmanager.echo(`Gathering Complete!`);

                        client.tradeskillmanager.gathering.running = false;
                    }
                }

                if (client.tradeskillmanager.butchering.running) {
                    if (client.tradeskillmanager.butchering.queue.length > 0) {
                        // client.tradeskillmanager.echo(`Butchering Queue: ${client.tradeskillmanager.butchering.queue.join(', ')}`);

                        const command = client.tradeskillmanager.butchering.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        if (client.tradeskillmanager.butchering.itemToRewield) {
                            send_command(`wield left ${client.tradeskillmanager.butchering.itemToRewield}`);
                        }
                        else {
                            send_command('unwield cleaver');
                        }

                        client.tradeskillmanager.echo(`Butchering Complete!`);

                        client.tradeskillmanager.butchering.running = false;
                    }
                }

                if (client.tradeskillmanager.inkmilling.running) {
                    if (client.tradeskillmanager.inkmilling.queue.length > 0) {
                        // client.tradeskillmanager.echo(`Inkmilling Queue: ${client.tradeskillmanager.inkmilling.queue.join(', ')}`);

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
                        client.tradeskillmanager.echo(`Inkmilling Complete!`);

                        client.tradeskillmanager.inkmilling.running = false;
                    }
                }
            },
            inrift(args: TriggerFunctionArgs): void {
                const amountMatch = args[1] || args[3] || args[5] || args[7] || args[9] || args[11] || '';
                const itemNameMatch = args[2] || args[4] || args[6] || args[8] || args[10] || args[12] || '';

                const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                if (itemNameMatch in client.tradeskillmanager.harvesting.names) {
                    const item: HarvestingNamesDictionary[keyof HarvestingNamesDictionary] | undefined = client.tradeskillmanager.harvesting.names[<keyof HarvestingNamesDictionary>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch in client.tradeskillmanager.transmutation.names) {
                    const item: TransmutationNamesDictionary[keyof TransmutationNamesDictionary] | undefined = client.tradeskillmanager.transmutation.names[<keyof TransmutationNamesDictionary>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch in client.tradeskillmanager.gathering.names) {
                    const item: GatheringNamesDictionary[keyof GatheringNamesDictionary] | undefined = client.tradeskillmanager.gathering.names[<keyof GatheringNamesDictionary>itemNameMatch];

                    if (item) {
                        if (item === 'milk' || item === 'saltwater') {
                            send_command(`pour ${item} into rift`);
                        }
                        else {
                            send_command(`inrift ${amount} ${item}`);
                        }
                    }
                }
                else if (itemNameMatch in client.tradeskillmanager.butchering.names) {
                    const item: ButcheringNamesDictionary[keyof ButcheringNamesDictionary] | undefined = client.tradeskillmanager.butchering.names[<keyof ButcheringNamesDictionary>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch in client.tradeskillmanager.inkmilling.names) {
                    const item: InkmillingNamesDictionary[keyof InkmillingNamesDictionary] | undefined = client.tradeskillmanager.inkmilling.names[<keyof InkmillingNamesDictionary>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch) {
                    client.tradeskillmanager.echo(`Unknown item '${itemNameMatch}'.`);
                }
            }
        };

        client.tradeskillmanager.echo('Loaded.');
    }
);
