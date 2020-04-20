import { GroupItem } from '../../../source';
import { gatheredExtra } from './gathered-extra';
import { cantGather } from './cant-gather';
import { gathered } from './gathered';
import { harvestedSac } from './harvested-sac';
import { harvestedSkin } from './harvested-skin';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantGather,
        gathered,
        gatheredExtra,
        harvestedSac,
        harvestedSkin
    ]
);
