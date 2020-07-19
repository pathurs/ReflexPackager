import { GroupItem } from '../../../../../source';
import { caught } from './caught';
import { off } from './off';
import { on } from './on';

export const Triggers = new GroupItem(
    'Triggers',
    [
        caught,
        off,
        on
    ]
);
