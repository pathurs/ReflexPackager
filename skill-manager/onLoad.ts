
import { FunctionItem } from '../source';
import {
    SkillManagerClient,
    HarvestingPhraseToNameMap,
    TransmutationPhraseToNameMap,
    GatheringPhraseToNameMap,
    ButcheringPhraseToNameMap,
    InkmillingPhraseToNameMap,
    InkmillingInks,
    InkmillingReagents,
    TarotCard
} from './skill-manager';
import { InventoryManagerClient } from '../inventory-manager/inventory-manager';
import { DisplayServiceClient } from '../display-service/display-service';

declare const client: SkillManagerClient & InventoryManagerClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.skillmanager = {
            enabled: true,
            running: false,
            harvesting: {
                enabled: true,
                queue: [],
                running: false,
                phraseToNameMap: {
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
                phraseToNameMap: {
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
                    'Forest': ['nut'],
                    'Garden': ['fruit', 'vegetable'],
                    'Grasslands': ['sugarcane', 'grain', 'from farm'],
                    'Jungle': ['fruit', 'cacao'],
                    'Natural underground': ['lumic', 'dust'],
                    'Valley': ['olive'],
                    'River': ['clay'],
                    'Ocean': ['saltwater']
                },
                phraseToNameMap: {
                    'assortment of vegetables': 'vegetable',
                    'vegetables': 'vegetable',
                    'lump of red clay': 'clay',
                    'lumps of red clay': 'clay',
                    'handful of fruits': 'fruit',
                    'pieces of fruit': 'fruit',
                    'handful of grain': 'grain',
                    'handfuls of grain': 'grain',
                    'small brown egg': 'egg',
                    'eggs': 'egg',
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
                phraseToNameMap: {
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
                phraseToNameMap: {
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
            tarot: {
                enabled: true,
                cards: [
                    'blank',
                    'sun',
                    'emperor',
                    'magician',
                    'priestess',
                    'fool',
                    'chariot',
                    'hermit',
                    'empress',
                    'lovers',
                    'hierophant',
                    'hangedman',
                    'tower',
                    'wheel',
                    'creator',
                    'justice',
                    'star',
                    'aeon',
                    'lust',
                    'universe',
                    'devil',
                    'moon',
                    'death'
                ],
                phraseToNameMap: {
                    'nothing': 'blank',
                    'Sun': 'sun',
                    'Emperor': 'emperor',
                    'Magician': 'magician',
                    'High Priestess': 'priestess',
                    'Fool': 'fool',
                    'Chariot': 'chariot',
                    'Hermit': 'hermit',
                    'Empress': 'empress',
                    'Lovers': 'lovers',
                    'Hierophant': 'hierophant',
                    'Hanged Man': 'hangedman',
                    'Tower': 'tower',
                    'Wheel of Fortune': 'wheel',
                    'Creator': 'creator',
                    'Justice': 'justice',
                    'Star': 'star',
                    'Aeon': 'aeon',
                    'Lust': 'lust',
                    'Universe': 'universe',
                    'Devil': 'devil',
                    'Moon': 'moon',
                    'Death': 'death'
                },
                inscribing: {
                    running: false,
                    queue: {
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
                    },
                    runQueue() {
                        if (client.skillmanager.tarot.inscribing.running) {
                            for (const card in client.skillmanager.tarot.inscribing.queue) {
                                if (client.skillmanager.tarot.inscribing.queue[<Exclude<TarotCard, 'blank'>>card] > 0) {
                                    send_command(`outd blank|inscribe blank with ${card}`, 1);

                                    return;
                                }
                            }

                            client.skillmanager.tarot.inscribing.running = false;

                            client.skillmanager.echo('Inscribing stopped.');
                        }
                    }
                }
            },
            echo(text) {
                client.displayservice.echo(`%white%[%deepskyblue%Skill Manager%end%]:%end% ${client.displayservice.colorify(text)}`);
            },
            error(text) {
                client.skillmanager.echo(`%red%${text}`);
            },
            save() {
                gmcp_save_system();

                client.skillmanager.echo('Settings saved.');
            },
            runQueue() {
                if (client.skillmanager.running) {
                    return;
                }
                else {
                    client.skillmanager.running = true;

                    // Ensure runQueue() is only called once
                    setTimeout(function () {
                        client.skillmanager.running = false;
                    });
                }

                if (client.skillmanager.harvesting.running) {
                    if (client.skillmanager.harvesting.queue.length > 0) {
                        // client.skillmanager.echo(`Harvesting Queue: ${client.skillmanager.harvesting.queue.join(', ')}`);

                        const command = client.skillmanager.harvesting.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        client.skillmanager.echo(`Harvesting Complete!`);

                        client.skillmanager.harvesting.running = false;
                    }
                }

                if (client.skillmanager.transmutation.running) {
                    if (client.skillmanager.transmutation.queue.length > 0) {
                        // client.inventoskillmanagerrymanager.echo(`${client.skillmanager.transmutation.queue.join(', ')}`);

                        const command = client.skillmanager.transmutation.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        client.skillmanager.echo(`Transmutation Complete!`);

                        client.skillmanager.transmutation.running = false;
                    }
                }


                if (client.skillmanager.gathering.running) {
                    if (client.skillmanager.gathering.queue.length > 0) {
                        // client.skillmanager.echo(`Gathering Queue: ${client.skillmanager.gathering.queue.join(', ')}`);

                        const command = client.skillmanager.gathering.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        client.skillmanager.echo(`Gathering Complete!`);

                        client.skillmanager.gathering.running = false;
                    }
                }

                if (client.skillmanager.butchering.running) {
                    if (client.skillmanager.butchering.queue.length > 0) {
                        // client.skillmanager.echo(`Butchering Queue: ${client.skillmanager.butchering.queue.join(', ')}`);

                        const command = client.skillmanager.butchering.queue.pop();

                        if (command) {
                            send_command(`queue add eqbal ${command}`);

                            return;
                        }
                    }
                    else {
                        if (client.skillmanager.butchering.itemToRewield) {
                            send_command(`wield left ${client.skillmanager.butchering.itemToRewield}`);
                        }
                        else {
                            send_command('unwield cleaver');
                        }

                        client.skillmanager.echo(`Butchering Complete!`);

                        client.skillmanager.butchering.running = false;
                    }
                }

                if (client.skillmanager.inkmilling.running) {
                    if (client.skillmanager.inkmilling.queue.length > 0) {
                        // client.skillmanager.echo(`Inkmilling Queue: ${client.skillmanager.inkmilling.queue.join(', ')}`);

                        const next = client.skillmanager.inkmilling.queue.pop();
                        const match = next?.match(/(\d+) (\w+)/) || [];
                        const amount = Number(match[1]);
                        const colour = match[2];

                        if (!amount || !colour) {
                            return;
                        }

                        const inkReagents: InkmillingInks[keyof InkmillingInks] | undefined = client.skillmanager.inkmilling.inks[<keyof InkmillingInks>colour];

                        const outriftCommands: string[] = [];
                        const putInMillCommands: string[] = [];

                        for (let inkReagent in inkReagents) {
                            const reagentAmount = amount * inkReagents[<keyof typeof inkReagents>inkReagent];
                            const reagents = client.skillmanager.inkmilling.reagents[<keyof InkmillingReagents>inkReagent];
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
                        client.skillmanager.echo(`Inkmilling Complete!`);

                        client.skillmanager.inkmilling.running = false;
                    }
                }
            },
            inrift(args: TriggerFunctionArgs): void {
                const amountMatch = args[1] || args[3] || args[5] || args[7] || args[9] || args[11] || '';
                const itemNameMatch = args[2] || args[4] || args[6] || args[8] || args[10] || args[12] || '';

                const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                if (itemNameMatch in client.skillmanager.harvesting.phraseToNameMap) {
                    const item: HarvestingPhraseToNameMap[keyof HarvestingPhraseToNameMap] | undefined = client.skillmanager.harvesting.phraseToNameMap[<keyof HarvestingPhraseToNameMap>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch in client.skillmanager.transmutation.phraseToNameMap) {
                    const item: TransmutationPhraseToNameMap[keyof TransmutationPhraseToNameMap] | undefined = client.skillmanager.transmutation.phraseToNameMap[<keyof TransmutationPhraseToNameMap>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch in client.skillmanager.gathering.phraseToNameMap) {
                    const item: GatheringPhraseToNameMap[keyof GatheringPhraseToNameMap] | undefined = client.skillmanager.gathering.phraseToNameMap[<keyof GatheringPhraseToNameMap>itemNameMatch];

                    if (item) {
                        if (item === 'milk' || item === 'saltwater') {
                            send_command(`pour ${item} into rift`);
                        }
                        else {
                            send_command(`inrift ${amount} ${item}`);
                        }
                    }
                }
                else if (itemNameMatch in client.skillmanager.butchering.phraseToNameMap) {
                    const item: ButcheringPhraseToNameMap[keyof ButcheringPhraseToNameMap] | undefined = client.skillmanager.butchering.phraseToNameMap[<keyof ButcheringPhraseToNameMap>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch in client.skillmanager.inkmilling.phraseToNameMap) {
                    const item: InkmillingPhraseToNameMap[keyof InkmillingPhraseToNameMap] | undefined = client.skillmanager.inkmilling.phraseToNameMap[<keyof InkmillingPhraseToNameMap>itemNameMatch];

                    if (item) {
                        send_command(`inrift ${amount} ${item}`);
                    }
                }
                else if (itemNameMatch) {
                    client.skillmanager.echo(`Unknown item '${itemNameMatch}'.`);
                }
            }
        };

        client.skillmanager.echo('Loaded.');
    }
);
