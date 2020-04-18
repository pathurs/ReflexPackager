
import { FunctionItem } from '../source';
import { TradeskillManagerClient } from './tradeskill-manager';
import { InventoryManagerClient } from '../inventory-manager/inventory-manager';

declare const client: TradeskillManagerClient & InventoryManagerClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.tradeskillmanager = {
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
            extracting: {
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
                    'sidewinder skins': 'skin'
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
                    'pieces of poultry': 'poultry'
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
            }
        };

        display_notice('Tradeskill Manager: Loaded.');
    }
);
