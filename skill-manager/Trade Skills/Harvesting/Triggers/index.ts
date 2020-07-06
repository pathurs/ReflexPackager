import { GroupItem } from '../../../../source';
import { cantHarvest } from './cant-harvest';
import { harvested } from './harvested';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantHarvest,
        harvested
    ]
);
