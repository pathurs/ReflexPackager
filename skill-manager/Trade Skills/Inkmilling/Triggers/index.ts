import { GroupItem } from '../../../../source';
import { millFailed } from './mill-failed';
import { milled } from './milled';
import { cantMill } from './cant-mill';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantMill,
        millFailed,
        milled
    ]
);
