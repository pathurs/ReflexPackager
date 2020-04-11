import { GroupItem } from '../../source';
import { arentWielding } from './arent-wielding';
import { alreadyWielding } from './already-wielding';
import { swappedHands } from './swapped-hands';
import { wieldWhat } from './wield-what';

export const Triggers = new GroupItem(
    'Triggers',
    [
        alreadyWielding,
        arentWielding,
        swappedHands,
        wieldWhat
    ]
);
