import { GroupItem } from '../../../../../source';
import { mountedUsedSuccessHit } from './mounted-used-success-hit';
import { mountedUsedSuccessMiss } from './mounted-used-success-miss';
import { usedFail } from './used-fail';
import { usedSuccessHit } from './used-success-hit';
import { usedSuccessMiss } from './used-success-miss';

export const Triggers = new GroupItem(
    'Triggers',
    [
        mountedUsedSuccessHit,
        mountedUsedSuccessMiss,
        usedFail,
        usedSuccessHit,
        usedSuccessMiss
    ]
);
