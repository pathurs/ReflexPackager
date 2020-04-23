import { GroupItem } from '../../source';
import { onInventoryChange } from './on-inventory-change';
import { cli } from './cli';
import { onContentsChange } from './on-contents-change';
import { cliContainers } from './cli-containers';
import { cliShow } from './cli-show';

export const Functions = new GroupItem(
    'Functions',
    [
        cli,
        cliContainers,
        cliShow,
        onContentsChange,
        onInventoryChange
    ]
);
