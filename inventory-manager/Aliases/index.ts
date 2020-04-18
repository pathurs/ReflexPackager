import { GroupItem } from '../../source';
import { infoInventory } from './info-inventory';
import { wield } from './wield';
import { unwield } from './unwield';
import { swapHands } from './swap-hands';
import { cli } from './cli';
import { getFrom } from './get-from';
import { putIn } from './put-in';

export const Aliases = new GroupItem(
    'Aliases',
    [
        cli,
        getFrom,
        infoInventory,
        putIn,
        wield,
        unwield,
        swapHands
    ]
);
