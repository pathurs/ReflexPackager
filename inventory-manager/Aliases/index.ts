import { GroupItem } from '../../source';
import { ii } from './ii';
import { wield } from './wield';
import { unwield } from './unwield';
import { swapHands } from './swap-hands';
import { config } from './config';

export const Aliases = new GroupItem(
    'Aliases',
    [
        config,
        ii,
        wield,
        unwield,
        swapHands
    ]
);
