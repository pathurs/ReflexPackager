import { GroupItem } from '../../../../../source';
import { usedFailNoPuppet } from './used-fail-no-puppet';
import { usedHit } from './used-hit';
import { usedMiss } from './used-miss';

export const Triggers = new GroupItem(
    'Triggers',
    [
        usedMiss,
        usedFailNoPuppet,
        usedHit
    ]
);
