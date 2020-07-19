import { GroupItem } from '../../source';
import { cityWho } from './city-who';
import { quickWho } from './quick-who';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cityWho,
        quickWho
    ]
);
