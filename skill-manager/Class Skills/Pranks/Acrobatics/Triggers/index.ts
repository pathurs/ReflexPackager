import { GroupItem } from '../../../../../source';
import { off } from './off';
import { on } from './on';

export const Triggers = new GroupItem(
    'Triggers',
    [
        off,
        on
    ]
);
