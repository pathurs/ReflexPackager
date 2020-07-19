import { GroupItem } from '../../../../../source';
import { hitEnd } from './hit-end';
import { usedSuccessStart } from './used-success-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        hitEnd,
        usedSuccessStart
    ]
);
