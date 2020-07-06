import { GroupItem } from '../../../../source';
import { mineralsMineral } from './minerals-mineral';
import { mineralsStart } from './minerals-start';
import { noMinerals } from './no-minerals';
import { plantsPlant } from './plants-plant';
import { plantsStart } from './plants-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        mineralsMineral,
        mineralsStart,
        noMinerals,
        plantsPlant,
        plantsStart
    ]
);
