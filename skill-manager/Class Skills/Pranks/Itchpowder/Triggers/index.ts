import { GroupItem } from '../../../../../source';
import { hit } from './hit';
import { usedStart } from './used-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        hit,
        usedStart
    ]
);
