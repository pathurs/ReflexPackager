import { GroupItem } from '../../../../source';
import { gatheredExtra } from './gathered-extra';
import { cantGather } from './cant-gather';
import { gathered } from './gathered';
import { gatheredMilk } from './gathered-milk';
import { gatheredSaltwater } from './gathered-saltwater';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantGather,
        gathered,
        gatheredExtra,
        gatheredMilk,
        gatheredSaltwater
    ]
);
