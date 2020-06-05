import { GroupItem } from '../../../../source';
import { gatheredExtra } from './gathered-extra';
import { cantGather } from './cant-gather';
import { gathered } from './gathered';
import { gatheredMilk } from './gathered-milk';
import { gatheredSaltwater } from './gathered-saltwater';
import { plantsPlant } from './plants-plant';
import { plantsStart } from './plants-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantGather,
        gathered,
        gatheredExtra,
        gatheredMilk,
        gatheredSaltwater,
        plantsPlant,
        plantsStart
    ]
);
