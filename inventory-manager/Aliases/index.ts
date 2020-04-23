import { GroupItem } from '../../source';
import { infoInventory } from './info-inventory';
import { wield } from './wield';
import { unwield } from './unwield';
import { swapHands } from './swap-hands';
import { cli } from './cli';

export const Aliases = new GroupItem(
    'Aliases',
    [
        cli,
        infoInventory,
        wield,
        unwield,
        swapHands
    ]
);
