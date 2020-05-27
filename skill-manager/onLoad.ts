
import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { QueueManagerClient } from 'queue-manager/queue-manager';
import { InventoryManagerClient } from 'inventory-manager/inventory-manager';
import {
    SkillManagerClient,
    SkillManagerInkmillingInks,
    SkillManagerTarotInscribingQueue,
    SkillManagerInkmillingInkReagents,
    SkillManagerInkmillingQueue
} from './skill-manager';

declare const client: SkillManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient & QueueManagerClient & InventoryManagerClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.skillmanager = {
            settings: get_variable('skill-manager:settings') || {
                enabled: true,
                harvesting: {
                    enabled: true
                },
                transmutation: {
                    enabled: true
                },
                gathering: {
                    enabled: true
                },
                collecting: {
                    enabled: true
                },
                inkmilling: {
                    enabled: true
                },
                tarot: {
                    enabled: true
                }
            },
            harvesting: {
                harvestables: [
                    'bayberry',
                    'bellwort',
                    'burdock',
                    'cohosh',
                    'bloodroot',
                    'echinacea',
                    'ginger',
                    'ginseng',
                    'goldenseal',
                    'hawthorn',
                    'moss',
                    'kelp',
                    'kola',
                    'kuzu',
                    'slipper',
                    'myrrh',
                    'lobelia',
                    'ash',
                    'sac',
                    'sileris',
                    'skin',
                    'skullcap',
                    'elm',
                    'valerian',
                    'weed',
                    'pear'
                ],
                descriptionDictionary: {
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
                    'venom sac': 'sac',
                    'venom sacs': 'sac',
                    'sileris berry': 'sileris',
                    'sileris berries': 'sileris',
                    'sidewinder skin': 'skin',
                    'sidewinder skins': 'skin',
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
                extractables: [
                    'antimony',
                    'argentum',
                    'arsenic',
                    'aurum',
                    'azurite',
                    'bisemutum',
                    'calamine',
                    'calcite',
                    'cinnabar',
                    'cuprum',
                    'dolomite',
                    'ferrum',
                    'gypsum',
                    'magnesium',
                    'malachite',
                    'plumbum',
                    'potash',
                    'quartz',
                    'quicksilver',
                    'realgar',
                    'stannum'
                ],
                descriptionDictionary: {
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
                butchering: {
                    active: false,
                    descriptionDictionary: {
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
                    },
                    start() {
                        if (client.skillmanager.gathering.butchering.active) {
                            client.skillmanager.error('Already butchering.');

                            return;
                        }

                        const corpses = client.gmcpservice.items.inv.filter(value => value.name.startsWith('the corpse of'));

                        if (corpses.length === 0) {
                            client.skillmanager.error(`You have no corpses.`);

                            return;
                        }

                        if (client.inventorymanager.settings.wielding.expectedLeftId) {
                            client.skillmanager.gathering.butchering.itemToRewield = client.inventorymanager.settings.wielding.expectedLeftId;
                        }

                        client.inventorymanager.wield('cleaver', 'left');

                        client.skillmanager.gathering.butchering.active = true;

                        client.skillmanager.gathering.butchering.butcher();

                        client.skillmanager.echo('Started butchering.');
                    },
                    stop() {
                        if (!client.skillmanager.gathering.butchering.active) {
                            client.skillmanager.error('Already not butchering.');

                            return;
                        }

                        client.skillmanager.gathering.butchering.active = false;

                        if (client.skillmanager.gathering.butchering.itemToRewield) {
                            client.inventorymanager.wield(client.skillmanager.gathering.butchering.itemToRewield, 'left');
                        }
                        else {
                            client.inventorymanager.unwield('cleaver');
                        }

                        client.skillmanager.echo('Stopped butchering.');
                    },
                    butcher() {
                        if (client.skillmanager.gathering.butchering.active) {
                            client.queuemanager.appendCommand('butcher corpse for reagent', 'equilibriumBalance', 'balance');
                        }
                    }
                },
                gatherables: [
                    'vegetable',
                    'clay',
                    'fruit',
                    'grain',
                    'egg',
                    'nut',
                    'olive',
                    'sugarcane',
                    'lumic',
                    'cacao',
                    'dust',
                    'goldbar',
                    'seed',
                    'goldflakes',
                    'milk',
                    'saltwater'
                ],
                environmentDictionary: {
                    'Forest': ['nut'],
                    'Garden': ['fruit', 'vegetable'],
                    'Grasslands': ['sugarcane', 'grain', 'from farm'],
                    'Jungle': ['fruit', 'cacao'],
                    'Natural underground': ['lumic', 'dust'],
                    'Valley': ['olive'],
                    'River': ['clay'],
                    'Ocean': ['saltwater']
                },
                descriptionDictionary: {
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
                    'sip of milk': 'milk',
                    'sips of milk': 'milk',
                    'sip of saltwater': 'saltwater',
                    'sips of saltwater': 'saltwater'
                },
                getGatherables() {
                    return client.skillmanager.gathering.environmentDictionary[client.gmcpservice.room.environment] || [];
                }
            },
            collecting: {
                active: false,
                automatic: false,
                waitingForPlants: false,
                waitingForMinerals: false,
                queue: new Set(),
                start() {
                    if (client.skillmanager.collecting.active) {
                        client.skillmanager.error('Already collecting.');

                        return;
                    }

                    client.skillmanager.collecting.active = true;
                    client.skillmanager.collecting.waitingForPlants = true;
                    client.skillmanager.collecting.waitingForMinerals = true;

                    client.skillmanager.gathering.getGatherables().forEach(value => {
                        client.skillmanager.collecting.queue.add(`gather ${value}`);
                    });

                    client.queuemanager.appendCommand('plants');
                    client.queuemanager.appendCommand('minerals');

                    client.skillmanager.echo('Started collecting.');
                },
                stop() {
                    if (!client.skillmanager.collecting.active) {
                        client.skillmanager.error('Already not collecting.');

                        return;
                    }

                    client.skillmanager.collecting.active = false;
                    client.skillmanager.collecting.waitingForPlants = false;
                    client.skillmanager.collecting.waitingForMinerals = false;

                    client.skillmanager.echo('Stopped collecting.');
                },
                clear() {
                    client.skillmanager.collecting.queue.clear();

                    client.skillmanager.echo('Reset collecting queue.');
                },
                collect() {
                    if (!client.skillmanager.collecting.active) {
                        return;
                    }

                    if (client.skillmanager.collecting.queue.size === 0) {
                        // Delay so last command can call inrift
                        setTimeout(() => {
                            client.skillmanager.collecting.stop();
                        });

                        return;
                    }

                    client.skillmanager.collecting.queue.forEach(value => {
                        client.queuemanager.appendCommand(value, 'equilibriumBalance', 'balance');
                    });

                    client.skillmanager.collecting.queue.clear();
                },
                tryCollect() {
                    if (client.skillmanager.collecting.active && !client.skillmanager.collecting.waitingForPlants && !client.skillmanager.collecting.waitingForMinerals) {
                        client.skillmanager.collecting.collect();
                    }
                }
            },
            inkmilling: {
                active: false,
                runningQueue: false,
                queue: {
                    red: 0,
                    blue: 0,
                    yellow: 0,
                    green: 0,
                    purple: 0,
                    gold: 0,
                    black: 0
                },
                reagents: {
                    red: ['redclay', 'redchitin'],
                    blue: ['inkbladder', 'lumic'],
                    yellow: ['yellowchitin'],
                    gold: ['goldflakes'],
                    common: ['fishscales'],
                    uncommon: ['buffalohorn'],
                    scarce: ['sharktooth'],
                    rare: ['wyrmtongue']
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
                descriptionDictionary: {
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
                },
                start() {
                    if (client.skillmanager.inkmilling.active) {
                        client.skillmanager.error('Already milling.');

                        return;
                    }

                    client.skillmanager.inkmilling.active = true;

                    client.skillmanager.inkmilling.runQueue();

                    client.skillmanager.echo('Started milling.');
                },
                stop() {
                    if (!client.skillmanager.inkmilling.active) {
                        client.skillmanager.error('Already not milling.');

                        return;
                    }

                    client.skillmanager.inkmilling.active = false;
                    client.skillmanager.inkmilling.runningQueue = false;

                    client.skillmanager.echo('Stopped milling.');
                },
                reset() {
                    client.skillmanager.inkmilling.queue = {
                        red: 0,
                        blue: 0,
                        yellow: 0,
                        green: 0,
                        purple: 0,
                        gold: 0,
                        black: 0
                    };

                    client.skillmanager.echo('Reset milling queue.');
                },
                runQueue() {
                    if (!client.skillmanager.inkmilling.active) {
                        return;
                    }

                    if (client.skillmanager.inkmilling.runningQueue) {
                        return;
                    }

                    client.skillmanager.inkmilling.runningQueue = true;

                    let inkColour: keyof SkillManagerInkmillingQueue | undefined;

                    for (const queueInkColour in client.skillmanager.inkmilling.queue) {
                        if (client.skillmanager.inkmilling.queue[<keyof SkillManagerInkmillingQueue>queueInkColour] > 0) {
                            inkColour = <keyof SkillManagerInkmillingQueue>queueInkColour;

                            break;
                        }
                    }

                    if (!inkColour) {
                        client.skillmanager.inkmilling.stop();

                        return;
                    }

                    // client.skillmanager.echo(`Inkmilling Queue: ${client.skillmanager.inkmilling.queue.join(', ')}`);

                    const queuedAmount = client.skillmanager.inkmilling.queue[inkColour];
                    const amount = 5 > queuedAmount ? queuedAmount : 5;

                    const inkReagents: SkillManagerInkmillingInkReagents | undefined = client.skillmanager.inkmilling.inks[<keyof SkillManagerInkmillingInks>inkColour];

                    const outriftCommands: string[] = [];
                    const putInMillCommands: string[] = [];

                    for (let inkReagent in inkReagents) {
                        const reagentAmount = amount * <number>inkReagents[<keyof SkillManagerInkmillingInkReagents>inkReagent];
                        const reagents = client.skillmanager.inkmilling.reagents[inkReagent];
                        const reagent = reagents.find(value => {
                            return Number(client.gmcpservice.rift[value]?.amount) >= reagentAmount;
                        });

                        if (reagent === undefined) {
                            client.skillmanager.inkmilling.queue[inkColour] = 0;
                            client.skillmanager.inkmilling.runningQueue = false;

                            client.systemservice.sendCommand('get 50 reagent from mill|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent');

                            client.skillmanager.error(`Ran out of ${reagents.join(' and ')}. Queue for ${inkColour} has been cleared.`);

                            client.skillmanager.inkmilling.runQueue();

                            return;
                        }

                        if (reagentAmount === 1) {
                            outriftCommands.push(`outrift ${reagent}`);
                            putInMillCommands.push(`put ${reagent} in mill`);
                        }
                        else {
                            outriftCommands.push(`outrift ${reagentAmount} ${reagent}`);
                            putInMillCommands.push(`put group ${reagent} in mill`);
                        }
                    }

                    client.systemservice.sendCommands(outriftCommands);
                    client.systemservice.sendCommands(putInMillCommands);
                    client.systemservice.sendCommand(`mill for ${amount} ${inkColour}`);

                    client.skillmanager.inkmilling.queue[inkColour] -= amount;
                }
            },
            tarot: {
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
                descriptionDictionary: {
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
                    active: false,
                    runningQueue: false,
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
                    start() {
                        if (client.skillmanager.tarot.inscribing.active) {
                            client.skillmanager.error('Already inscribing.');

                            return;
                        }

                        client.skillmanager.tarot.inscribing.active = true;

                        client.skillmanager.tarot.inscribing.runQueue();

                        client.skillmanager.echo('Started inscribing.');
                    },
                    stop() {
                        if (!client.skillmanager.tarot.inscribing.active) {
                            client.skillmanager.error('Already not inscribing.');

                            return;
                        }

                        client.skillmanager.tarot.inscribing.active = false;
                        client.skillmanager.tarot.inscribing.runningQueue = false;

                        client.skillmanager.echo('Stopped inscribing.');
                    },
                    reset() {
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

                        client.skillmanager.echo('Reset inscribing queue.');
                    },
                    runQueue() {
                        if (!client.skillmanager.tarot.inscribing.active) {
                            return;
                        }

                        if (client.skillmanager.tarot.inscribing.runningQueue) {
                            return;
                        }

                        client.skillmanager.tarot.inscribing.runningQueue = true;

                        let card: string | undefined;

                        for (const queueCard in client.skillmanager.tarot.inscribing.queue) {
                            if (client.skillmanager.tarot.inscribing.queue[<keyof SkillManagerTarotInscribingQueue>queueCard] > 0) {
                                card = queueCard;

                                break;
                            }
                        }

                        if (!card) {
                            client.skillmanager.tarot.inscribing.stop();

                            return;
                        }


                        client.queuemanager.appendCommand('outd blank');
                        client.queuemanager.appendCommand('inscribe blank with ${card}');
                    }
                }
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%Skill Manager%end%]:%end% ${client.displayservice.colorify(text)}`);
            },
            error(text) {
                client.skillmanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('skill-manager', () => {
                    set_variable('skil-manager:settings', client.skillmanager.settings);

                    client.skillmanager.echo('Settings saved.');
                });
            }
        };

        client.gmcpservice.subscribe(['Room.Info'], () => {
            if (client.skillmanager.collecting.active) {
                if (client.gmcpservice.previousRoom.num !== client.gmcpservice.room.num) {
                    // Delay stopping so the last collect can call inrift
                    setTimeout(() => {
                        client.skillmanager.collecting.stop();
                    });
                }
            }

            if (client.skillmanager.collecting.automatic) {
                // Delay starting so collecting starts after it stops
                setTimeout(() => {
                    client.skillmanager.collecting.start();
                });
            }
        });

        client.queuemanager.subscribe(['balance', 'equilibrium', 'equilibriumBalance'], (_queue, method, _args) => {
            if (client.skillmanager.gathering.butchering.active) {
                // TODO: Confirm we were actually butchering
                if (method === 'run') {
                    client.skillmanager.gathering.butchering.butcher();
                }
            }

            if (client.skillmanager.collecting.active) {
                // TODO: Confirm we were actually collecting
                if (method === 'run' && client.queuemanager.equilibriumBalance.queue.length === 0) {
                    // Delay stopping so the last collect can call inrift
                    setTimeout(() => {
                        client.skillmanager.collecting.stop();
                    });
                }
            }
        });

        client.skillmanager.echo('Loaded.');
    }
);
