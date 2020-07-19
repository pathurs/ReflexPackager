import { GroupItem } from '../../../../../source';
import { usedFailRebound1 } from './used-fail-rebound-1';
import { usedFailRebound2 } from './used-fail-rebound-2';
import { usedSuccess } from './used-success';

export const Triggers = new GroupItem(
    'Triggers',
    [
        usedFailRebound1,
        usedFailRebound2,
        usedSuccess
    ]
);
