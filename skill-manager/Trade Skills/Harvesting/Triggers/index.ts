import { GroupItem } from '../../../../source';
import { cantHarvest } from './cant-harvest';
import { harvested } from './harvested';
import { plantsPlant } from './plants-plant';
import { plantsStart } from './plants-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantHarvest,
        harvested,
        plantsPlant,
        plantsStart
    ]
);
