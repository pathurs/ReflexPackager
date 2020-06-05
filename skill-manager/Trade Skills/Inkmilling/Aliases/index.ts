import { GroupItem } from '../../../../source';
import { mill } from './mill';
import { millClear } from './mill-clear';
import { millStop } from './mill-stop';

export const Aliases = new GroupItem(
    'Aliases',
    [
        millClear,
        millStop,
        mill
    ]
);
