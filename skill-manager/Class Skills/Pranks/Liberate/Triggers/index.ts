import { GroupItem } from '../../../../../source';
import { stutterFour } from './stutter-four';
import { stutterOne } from './stutter-one';
import { stutterThree } from './stutter-three';
import { stutterTwo } from './stutter-two';
import { usedMiss } from './used-miss';

export const Triggers = new GroupItem(
    'Triggers',
    [
        stutterFour,
        stutterOne,
        stutterThree,
        stutterTwo,
        usedMiss
    ]
);
