import { GroupItem } from '../../source';
import { onInventoryChange } from './on-inventory-change';
import { reset } from './reset';
import { config } from './config';
import { containers } from './containers';
import { show } from './show';
import { setup } from './setup';

export const Functions = new GroupItem(
    'Functions',
    [
        config,
        containers,
        onInventoryChange,
        reset,
        setup,
        show
    ]
);
