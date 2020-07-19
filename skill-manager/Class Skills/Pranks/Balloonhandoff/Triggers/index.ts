import { GroupItem } from '../../../../../source';
import { balloonhandoffFly } from './balloonhandoff-fly';
import { balloonhandoffUsedStart } from './balloonhandoff-used-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        balloonhandoffFly,
        balloonhandoffUsedStart
    ]
);
