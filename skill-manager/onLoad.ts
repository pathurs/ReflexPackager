
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
        client.skillManager = {
            settings: client.systemService.defaultsDeep(get_variable('skill-manager:settings'), {
                enabled: true,
                pranks: {
                    enabled: true
                },
                tarot: {
                    enabled: true
                },
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
                }
            }),
            pranks: {
                handspring(target) {
                    return `handspring ${target}`;
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
                        if (client.skillManager.tarot.inscribing.active) {
                            client.skillManager.error('Already inscribing.');

                            return;
                        }

                        client.skillManager.tarot.inscribing.active = true;

                        client.skillManager.tarot.inscribing.runQueue();

                        client.skillManager.echo('Started inscribing.');
                    },
                    stop() {
                        if (!client.skillManager.tarot.inscribing.active) {
                            client.skillManager.error('Already not inscribing.');

                            return;
                        }

                        client.skillManager.tarot.inscribing.active = false;
                        client.skillManager.tarot.inscribing.runningQueue = false;

                        client.skillManager.echo('Stopped inscribing.');
                    },
                    reset() {
                        client.skillManager.tarot.inscribing.queue = {
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

                        client.skillManager.echo('Reset inscribing queue.');
                    },
                    runQueue() {
                        if (!client.skillManager.tarot.inscribing.active) {
                            return;
                        }

                        if (client.skillManager.tarot.inscribing.runningQueue) {
                            return;
                        }

                        client.skillManager.tarot.inscribing.runningQueue = true;

                        let card: string | undefined;

                        for (const queueCard in client.skillManager.tarot.inscribing.queue) {
                            if (client.skillManager.tarot.inscribing.queue[<keyof SkillManagerTarotInscribingQueue>queueCard] > 0) {
                                card = queueCard;

                                break;
                            }
                        }

                        if (!card) {
                            client.skillManager.tarot.inscribing.stop();

                            return;
                        }


                        client.queueManager.appendCommand('outd blank');
                        client.queueManager.appendCommand(`inscribe blank with ${card}`);
                    }
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
                        if (client.skillManager.gathering.butchering.active) {
                            client.skillManager.error('Already butchering.');

                            return;
                        }

                        const corpses = client.gmcpService.items.inv.filter(value => value.name.startsWith('the corpse of'));

                        if (corpses.length === 0) {
                            client.skillManager.error(`You have no corpses.`);

                            return;
                        }

                        if (client.inventoryManager.settings.wielding.expectedLeftId) {
                            client.skillManager.gathering.butchering.itemToRewield = client.inventoryManager.settings.wielding.expectedLeftId;
                        }

                        client.inventoryManager.wield('cleaver', 'left');

                        client.skillManager.gathering.butchering.active = true;

                        client.skillManager.gathering.butchering.butcher();

                        client.skillManager.echo('Started butchering.');
                    },
                    stop() {
                        if (!client.skillManager.gathering.butchering.active) {
                            client.skillManager.error('Already not butchering.');

                            return;
                        }

                        client.skillManager.gathering.butchering.active = false;

                        if (client.skillManager.gathering.butchering.itemToRewield) {
                            client.inventoryManager.wield(client.skillManager.gathering.butchering.itemToRewield, 'left');
                        }
                        else {
                            client.inventoryManager.unwield('cleaver');
                        }

                        client.skillManager.echo('Stopped butchering.');
                    },
                    butcher() {
                        if (client.skillManager.gathering.butchering.active) {
                            client.queueManager.appendCommand('butcher corpse for reagent', 'equilibriumBalance', 'balance');
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
                    return client.skillManager.gathering.environmentDictionary[client.gmcpService.room.environment] || [];
                }
            },
            collecting: {
                active: false,
                automatic: false,
                waitingForPlants: false,
                waitingForMinerals: false,
                queue: new Set(),
                start() {
                    if (client.skillManager.collecting.active) {
                        client.skillManager.error('Already collecting.');

                        return;
                    }

                    client.skillManager.collecting.active = true;
                    client.skillManager.collecting.waitingForPlants = true;
                    client.skillManager.collecting.waitingForMinerals = true;

                    client.skillManager.gathering.getGatherables().forEach(value => {
                        client.skillManager.collecting.queue.add(`gather ${value}`);
                    });

                    client.queueManager.appendCommand('plants');
                    client.queueManager.appendCommand('minerals');

                    client.skillManager.echo('Started collecting.');
                },
                stop() {
                    if (!client.skillManager.collecting.active) {
                        client.skillManager.error('Already not collecting.');

                        return;
                    }

                    client.skillManager.collecting.active = false;
                    client.skillManager.collecting.waitingForPlants = false;
                    client.skillManager.collecting.waitingForMinerals = false;

                    client.skillManager.echo('Stopped collecting.');
                },
                clear() {
                    client.skillManager.collecting.queue.clear();

                    client.skillManager.echo('Reset collecting queue.');
                },
                collect() {
                    if (!client.skillManager.collecting.active) {
                        return;
                    }

                    if (client.skillManager.collecting.queue.size === 0) {
                        // Delay so last command can call inrift
                        setTimeout(() => {
                            client.skillManager.collecting.stop();
                        });

                        return;
                    }

                    client.skillManager.collecting.queue.forEach(value => {
                        client.queueManager.appendCommand(value, 'equilibriumBalance', 'balance');
                    });

                    client.skillManager.collecting.queue.clear();
                },
                tryCollect() {
                    if (client.skillManager.collecting.active && !client.skillManager.collecting.waitingForPlants && !client.skillManager.collecting.waitingForMinerals) {
                        client.skillManager.collecting.collect();
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
                mill(colour, amount = 1) {
                    return `mill for ${amount} ${colour}`;
                },
                start() {
                    if (client.skillManager.inkmilling.active) {
                        client.skillManager.error('Already milling.');

                        return;
                    }

                    client.skillManager.inkmilling.active = true;

                    client.skillManager.inkmilling.runQueue();

                    client.skillManager.echo('Started milling.');
                },
                stop() {
                    if (!client.skillManager.inkmilling.active) {
                        client.skillManager.error('Already not milling.');

                        return;
                    }

                    client.skillManager.inkmilling.active = false;
                    client.skillManager.inkmilling.runningQueue = false;

                    client.skillManager.echo('Stopped milling.');
                },
                reset() {
                    client.skillManager.inkmilling.queue = {
                        red: 0,
                        blue: 0,
                        yellow: 0,
                        green: 0,
                        purple: 0,
                        gold: 0,
                        black: 0
                    };

                    client.skillManager.echo('Reset milling queue.');
                },
                runQueue() {
                    if (!client.skillManager.inkmilling.active) {
                        return;
                    }

                    if (client.skillManager.inkmilling.runningQueue) {
                        return;
                    }

                    client.skillManager.inkmilling.runningQueue = true;

                    let inkColour: keyof SkillManagerInkmillingQueue | undefined;

                    for (const queueInkColour in client.skillManager.inkmilling.queue) {
                        if (client.skillManager.inkmilling.queue[<keyof SkillManagerInkmillingQueue>queueInkColour] > 0) {
                            inkColour = <keyof SkillManagerInkmillingQueue>queueInkColour;

                            break;
                        }
                    }

                    if (!inkColour) {
                        client.skillManager.inkmilling.stop();

                        return;
                    }

                    // client.skillmanager.echo(`Inkmilling Queue: ${client.skillmanager.inkmilling.queue.join(', ')}`);

                    const queuedAmount = client.skillManager.inkmilling.queue[inkColour];
                    const amount = 5 > queuedAmount ? queuedAmount : 5;

                    const inkReagents: SkillManagerInkmillingInkReagents | undefined = client.skillManager.inkmilling.inks[<keyof SkillManagerInkmillingInks>inkColour];

                    const outriftCommands: string[] = [];
                    const putInMillCommands: string[] = [];

                    for (let inkReagent in inkReagents) {
                        const reagentAmount = amount * <number>inkReagents[<keyof SkillManagerInkmillingInkReagents>inkReagent];
                        const reagents = client.skillManager.inkmilling.reagents[inkReagent];
                        const reagent = reagents.find(value => {
                            return Number(client.gmcpService.rift[value]?.amount) >= reagentAmount;
                        });

                        if (reagent === undefined) {
                            client.skillManager.inkmilling.queue[inkColour] = 0;
                            client.skillManager.inkmilling.runningQueue = false;

                            client.systemService.sendCommand('get 50 reagent from mill|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent');

                            client.skillManager.error(`Ran out of ${reagents.join(' and ')}. Queue for ${inkColour} has been cleared.`);

                            client.skillManager.inkmilling.runQueue();

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

                    client.systemService.sendCommands(outriftCommands);
                    client.systemService.sendCommands(putInMillCommands);
                    client.systemService.sendCommand(client.skillManager.inkmilling.mill(inkColour, amount));

                    client.skillManager.inkmilling.queue[inkColour] -= amount;
                }
            },
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%Skill Manager%end%]:%end% ${client.displayService.colorify(text)}`);
            },
            error(text) {
                client.skillManager.echo(`%red%${text}%end%`);
            },
            save() {
                client.systemService.save('skill-manager', () => {
                    set_variable('skil-manager:settings', client.skillManager.settings);

                    client.skillManager.echo('Settings saved.');
                });
            }
        };

        client.gmcpService.subscribe(['Room.Info'], () => {
            if (client.skillManager.collecting.active) {
                if (client.gmcpService.previousRoom.num !== client.gmcpService.room.num) {
                    // Delay stopping so the last collect can call inrift
                    setTimeout(() => {
                        client.skillManager.collecting.stop();
                    });
                }
            }

            if (client.skillManager.collecting.automatic) {
                // Delay starting so collecting starts after it stops
                setTimeout(() => {
                    client.skillManager.collecting.start();
                });
            }
        });

        client.queueManager.subscribe(['balance', 'equilibrium', 'equilibriumBalance'], (_queue, method, _args) => {
            if (client.skillManager.gathering.butchering.active) {
                // TODO: Confirm we were actually butchering
                if (method === 'run') {
                    client.skillManager.gathering.butchering.butcher();
                }
            }

            if (client.skillManager.collecting.active) {
                // TODO: Confirm we were actually collecting
                if (method === 'run' && client.queueManager.equilibriumBalance.queue.length === 0) {
                    // Delay stopping so the last collect can call inrift
                    setTimeout(() => {
                        client.skillManager.collecting.stop();
                    });
                }
            }
        });

        client.skillManager.echo('Loaded.');
    }
);
