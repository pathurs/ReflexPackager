
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
                class: {
                    pranks: {
                        enabled: true
                    },
                    puppetry: {
                        enabled: true
                    },
                    tarot: {
                        enabled: true
                    },
                    tekura: {
                        enabled: true
                    },
                    telepathy: {
                        enabled: true
                    }
                },
                general: {

                },
                trade: {
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
                }
            }),
            skills: {
                class: {
                    pranks: {
                        active: true,
                        classes: [
                            'jester'
                        ],
                        handspring(target) {
                            return `handspring ${target}`;
                        }
                    },
                    puppetry: {
                        active: true,
                        classes: [
                            'jester'
                        ]
                    },
                    tarot: {
                        active: true,
                        classes: [
                            'jester',
                            'occultist'
                        ],
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
                            amount: 0,
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
                                if (client.skillManager.skills.class.tarot.inscribing.active) {
                                    client.skillManager.error('Already inscribing.');

                                    return;
                                }

                                client.skillManager.skills.class.tarot.inscribing.active = true;

                                client.skillManager.skills.class.tarot.inscribing.runQueue();

                                client.skillManager.echo('Started inscribing.');
                            },
                            stop() {
                                if (!client.skillManager.skills.class.tarot.inscribing.active) {
                                    client.skillManager.error('Already not inscribing.');

                                    return;
                                }

                                client.skillManager.skills.class.tarot.inscribing.active = false;
                                client.skillManager.skills.class.tarot.inscribing.runningQueue = false;

                                client.skillManager.echo('Stopped inscribing.');
                            },
                            reset() {
                                client.skillManager.skills.class.tarot.inscribing.queue = {
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
                                if (!client.skillManager.skills.class.tarot.inscribing.active) {
                                    return;
                                }

                                if (client.skillManager.skills.class.tarot.inscribing.runningQueue) {
                                    return;
                                }

                                client.skillManager.skills.class.tarot.inscribing.runningQueue = true;

                                let card: string | undefined;
                                let amount = 0;

                                for (const queueCard in client.skillManager.skills.class.tarot.inscribing.queue) {
                                    if (client.skillManager.skills.class.tarot.inscribing.queue[<keyof SkillManagerTarotInscribingQueue>queueCard] > 0) {
                                        card = queueCard;
                                        amount = Math.min(client.skillManager.skills.class.tarot.inscribing.queue[<keyof SkillManagerTarotInscribingQueue>queueCard], 20);

                                        break;
                                    }
                                }

                                if (!card) {
                                    client.skillManager.skills.class.tarot.inscribing.stop();

                                    return;
                                }

                                client.skillManager.skills.class.tarot.inscribing.amount = amount;

                                client.queueManager.appendCommand(`inscribe blank with ${amount} ${card}`, 'equilibriumBalance');
                            }
                        }
                    },
                    tekura: {
                        active: true,
                        classes: [
                            'monk'
                        ]
                    },
                    telepathy: {
                        active: true,
                        classes: [
                            'monk'
                        ]
                    }
                },
                general: {

                },
                trade: {
                    harvesting: {
                        active: true,
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
                        active: true,
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
                        active: true,
                        butchering: {
                            running: false,
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
                                if (client.skillManager.skills.trade.gathering.butchering.running) {
                                    client.skillManager.error('Already butchering.');

                                    return;
                                }

                                const corpses = client.gmcpService.items.inv.filter(value => value.name.startsWith('the corpse of'));

                                if (corpses.length === 0) {
                                    client.skillManager.error(`You have no corpses.`);

                                    return;
                                }

                                if (client.inventoryManager.settings.wielding.expectedLeftId) {
                                    client.skillManager.skills.trade.gathering.butchering.itemToRewield = client.inventoryManager.settings.wielding.expectedLeftId;
                                }

                                client.inventoryManager.wield('cleaver', 'left');

                                client.skillManager.skills.trade.gathering.butchering.running = true;

                                client.skillManager.skills.trade.gathering.butchering.butcher();

                                client.skillManager.echo('Started butchering.');
                            },
                            stop() {
                                if (!client.skillManager.skills.trade.gathering.butchering.running) {
                                    client.skillManager.error('Already not butchering.');

                                    return;
                                }

                                client.skillManager.skills.trade.gathering.butchering.running = false;

                                if (client.skillManager.skills.trade.gathering.butchering.itemToRewield) {
                                    client.inventoryManager.wield(client.skillManager.skills.trade.gathering.butchering.itemToRewield, 'left');
                                }
                                else {
                                    client.inventoryManager.unwield('cleaver');
                                }

                                client.skillManager.echo('Stopped butchering.');
                            },
                            butcher() {
                                if (client.skillManager.skills.trade.gathering.butchering.running) {
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
                            return client.skillManager.skills.trade.gathering.environmentDictionary[client.gmcpService.room.environment] || [];
                        }
                    },
                    collecting: {
                        active: true,
                        running: false,
                        automatic: false,
                        waitingForPlants: false,
                        waitingForMinerals: false,
                        queue: new Set(),
                        day: '',
                        rooms: {},
                        start() {
                            if (client.skillManager.skills.trade.collecting.running) {
                                client.skillManager.error('Already collecting.');

                                return;
                            }

                            client.skillManager.skills.trade.collecting.running = true;
                            client.skillManager.skills.trade.collecting.waitingForPlants = true;
                            client.skillManager.skills.trade.collecting.waitingForMinerals = true;

                            client.skillManager.skills.trade.gathering.getGatherables().forEach(value => {
                                client.skillManager.skills.trade.collecting.queue.add(`gather ${value}`);
                            });

                            client.queueManager.appendCommand('plants');
                            client.queueManager.appendCommand('minerals');

                            client.skillManager.echo('Started collecting.');
                        },
                        stop() {
                            if (!client.skillManager.skills.trade.collecting.running) {
                                client.skillManager.error('Already not collecting.');

                                return;
                            }

                            client.skillManager.skills.trade.collecting.running = false;
                            client.skillManager.skills.trade.collecting.waitingForPlants = false;
                            client.skillManager.skills.trade.collecting.waitingForMinerals = false;

                            client.skillManager.echo('Stopped collecting.');
                        },
                        clear() {
                            client.skillManager.skills.trade.collecting.queue.clear();

                            client.skillManager.echo('Reset collecting queue.');
                        },
                        collect() {
                            if (!client.skillManager.skills.trade.collecting.running) {
                                return;
                            }

                            if (client.skillManager.skills.trade.collecting.queue.size === 0) {
                                // Delay so last command can call inrift
                                setTimeout(() => {
                                    client.skillManager.skills.trade.collecting.stop();
                                });

                                return;
                            }

                            client.skillManager.skills.trade.collecting.queue.forEach(value => {
                                client.queueManager.appendCommand(value, 'equilibriumBalance', 'balance');
                            });

                            client.skillManager.skills.trade.collecting.queue.clear();
                        },
                        tryCollect() {
                            if (client.skillManager.skills.trade.collecting.running && !client.skillManager.skills.trade.collecting.waitingForPlants && !client.skillManager.skills.trade.collecting.waitingForMinerals) {
                                client.skillManager.skills.trade.collecting.collect();
                            }
                        },
                        onPlant(args) {
                            if (client.skillManager.settings.trade.collecting.enabled && client.skillManager.skills.trade.collecting.running) {
                                gag_current_line();

                                const item = args[1].trim().toLowerCase();

                                const collected = client.skillManager.skills.trade.collecting.rooms[client.gmcpService.room.num] || [];

                                if (!collected.includes(item)) {
                                    if (client.skillManager.skills.trade.harvesting.harvestables.includes(item)) {
                                        client.skillManager.skills.trade.collecting.queue.add(`harvest ${item}`);
                                    }
                                    else if (client.skillManager.skills.trade.gathering.gatherables.includes(item)) {
                                        client.skillManager.skills.trade.collecting.queue.add(`gather ${item}`);
                                    }
                                }
                            }
                        },
                        onMineral(args) {
                            if (client.skillManager.settings.trade.collecting.enabled && client.skillManager.skills.trade.collecting.running) {
                                gag_current_line();

                                const item = args[1].trim().toLowerCase();

                                const collected = client.skillManager.skills.trade.collecting.rooms[client.gmcpService.room.num] || [];

                                if (client.skillManager.skills.trade.transmutation.extractables.includes(item) && !collected.includes(item)) {
                                    client.skillManager.skills.trade.collecting.queue.add(`extract ${item}`);
                                }
                            }
                        },
                        onCollected(args) {
                            if (client.skillManager.settings.trade.collecting.enabled && client.skillManager.skills.trade.collecting.running) {
                                const amountMatch = args[1] || '';
                                const itemNameMatch = args[2];

                                const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                                const item: string | undefined = client.skillManager.skills.trade.harvesting.descriptionDictionary[itemNameMatch]
                                    || client.skillManager.skills.trade.transmutation.descriptionDictionary[itemNameMatch]
                                    || client.skillManager.skills.trade.gathering.descriptionDictionary[itemNameMatch];

                                if (item) {
                                    const collected = client.skillManager.skills.trade.collecting.rooms[client.gmcpService.room.num] || [];

                                    collected.push(item);

                                    client.skillManager.skills.trade.collecting.rooms[client.gmcpService.room.num] = collected;

                                    client.systemService.sendCommand(`inrift ${amount} ${item}`);
                                }
                            }
                        }
                    },
                    inkmilling: {
                        active: true,
                        running: false,
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
                            if (client.skillManager.skills.trade.inkmilling.running) {
                                client.skillManager.error('Already milling.');

                                return;
                            }

                            client.skillManager.skills.trade.inkmilling.running = true;

                            client.skillManager.skills.trade.inkmilling.runQueue();

                            client.skillManager.echo('Started milling.');
                        },
                        stop() {
                            if (!client.skillManager.skills.trade.inkmilling.running) {
                                client.skillManager.error('Already not milling.');

                                return;
                            }

                            client.skillManager.skills.trade.inkmilling.running = false;
                            client.skillManager.skills.trade.inkmilling.runningQueue = false;

                            client.skillManager.echo('Stopped milling.');
                        },
                        reset() {
                            client.skillManager.skills.trade.inkmilling.queue = {
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
                            if (!client.skillManager.skills.trade.inkmilling.running) {
                                return;
                            }

                            if (client.skillManager.skills.trade.inkmilling.runningQueue) {
                                return;
                            }

                            client.skillManager.skills.trade.inkmilling.runningQueue = true;

                            let inkColour: keyof SkillManagerInkmillingQueue | undefined;

                            for (const queueInkColour in client.skillManager.skills.trade.inkmilling.queue) {
                                if (client.skillManager.skills.trade.inkmilling.queue[<keyof SkillManagerInkmillingQueue>queueInkColour] > 0) {
                                    inkColour = <keyof SkillManagerInkmillingQueue>queueInkColour;

                                    break;
                                }
                            }

                            if (!inkColour) {
                                client.skillManager.skills.trade.inkmilling.stop();

                                return;
                            }

                            // client.skillManager.echo(`Inkmilling Queue: ${client.skillManager.skills.trade.inkmilling.queue.join(', ')}`);

                            const queuedAmount = client.skillManager.skills.trade.inkmilling.queue[inkColour];
                            const amount = 5 > queuedAmount ? queuedAmount : 5;

                            const inkReagents: SkillManagerInkmillingInkReagents | undefined = client.skillManager.skills.trade.inkmilling.inks[<keyof SkillManagerInkmillingInks>inkColour];

                            const outriftCommands: string[] = [];
                            const putInMillCommands: string[] = [];

                            for (let inkReagent in inkReagents) {
                                const reagentAmount = amount * <number>inkReagents[<keyof SkillManagerInkmillingInkReagents>inkReagent];
                                const reagents = client.skillManager.skills.trade.inkmilling.reagents[inkReagent];
                                const reagent = reagents.find(value => {
                                    return Number(client.gmcpService.rift[value]?.amount) >= reagentAmount;
                                });

                                if (reagent === undefined) {
                                    client.skillManager.skills.trade.inkmilling.queue[inkColour] = 0;
                                    client.skillManager.skills.trade.inkmilling.runningQueue = false;

                                    client.systemService.sendCommand('get 50 reagent from mill|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent|inr 50 reagent');

                                    client.skillManager.error(`Ran out of ${reagents.join(' and ')}. Queue for ${inkColour} has been cleared.`);

                                    client.skillManager.skills.trade.inkmilling.runQueue();

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
                            client.systemService.sendCommand(client.skillManager.skills.trade.inkmilling.mill(inkColour, amount));

                            client.skillManager.skills.trade.inkmilling.queue[inkColour] -= amount;
                        }
                    }
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
            },
            onAbility(skill, ability, command, eventOrEvents, args) {
                if (Array.isArray(args)) {
                    colorize_current_line(0, args[0].length, 'lightsalmon');
                }
                else {
                    for (const line of args.lines) {
                        if ('parsed_line' in line) {
                            line.parsed_line.colorize(0, line.line.length, 'lightsalmon');
                        }
                    }
                }

                const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];

                events.forEach(event => {
                    client.skillManager.echo(`${skill}:${ability}:${command}:${event}`);
                });
            }
        };

        client.gmcpService.subscribe(['Room.Info'], () => {
            if (client.skillManager.skills.trade.collecting.running) {
                if (client.gmcpService.previousRoom.num !== client.gmcpService.room.num) {
                    // Delay stopping so the last collect can call inrift
                    setTimeout(() => {
                        client.skillManager.skills.trade.collecting.stop();
                    });
                }
            }

            if (client.skillManager.skills.trade.collecting.automatic) {
                // Delay starting so collecting starts after it stops
                setTimeout(() => {
                    client.skillManager.skills.trade.collecting.start();
                });
            }
        });

        client.gmcpService.subscribe(['IRE.Time.List', 'IRE.Time.Update'], args => {
            if ('day' in args.gmcp_args && args.gmcp_args.day !== undefined) {
                client.skillManager.skills.trade.collecting.day = args.gmcp_args.day;

                client.skillManager.skills.trade.collecting.rooms = {};
            }
        });

        client.queueManager.subscribe(['balance', 'equilibrium', 'equilibriumBalance'], (_queue, method, _args) => {
            if (client.skillManager.skills.trade.gathering.butchering.running) {
                // TODO: Confirm we were actually butchering
                if (method === 'run') {
                    client.skillManager.skills.trade.gathering.butchering.butcher();
                }
            }

            if (client.skillManager.skills.trade.collecting.running) {
                // TODO: Confirm we were actually collecting
                if (method === 'run' && client.queueManager.equilibriumBalanceQueue.length === 0) {
                    // Delay stopping so the last collect can call inrift
                    setTimeout(() => {
                        client.skillManager.skills.trade.collecting.stop();
                    });
                }
            }
        });

        send_GMCP('IRE.Time.Request');

        client.skillManager.echo('Loaded.');
    }
);
