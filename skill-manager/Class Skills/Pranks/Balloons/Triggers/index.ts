import { GroupItem } from '../../../../../source';
import { end } from './end';
import { fly } from './fly';
import { usedFly } from './used-fly';
import { usedNoFly } from './used-no-fly';

export const Triggers = new GroupItem(
    'Triggers',
    [
        end,
        fly,
        usedFly,
        usedNoFly
    ]
);
