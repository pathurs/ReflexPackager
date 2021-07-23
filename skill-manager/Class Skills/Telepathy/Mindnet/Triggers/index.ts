import { GroupItem } from '../../../../../source';
import { entered } from './entered';
import { left } from './left';

export const Triggers = new GroupItem(
    'Triggers',
    [
        entered,
        left
    ]
);
