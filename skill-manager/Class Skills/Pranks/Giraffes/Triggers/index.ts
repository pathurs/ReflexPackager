import { GroupItem } from '../../../../../source';
import { dismountGiraffeUsedSuccess } from './dismount-giraffe-used-success';
import { dropGiraffeUsedSuccess } from './drop-giraffe-used-success';
import { inflateBalloonIntoGiraffeUsedSuccess } from './inflate-balloon-into-giraffe-used-success';
import { mountGiraffeUsedSuccess } from './mount-giraffe-used-success';
import { stepIntoTreesUsedSuccess } from './step-into-trees-used-success';

export const Triggers = new GroupItem(
    'Triggers',
    [
        dismountGiraffeUsedSuccess,
        dropGiraffeUsedSuccess,
        inflateBalloonIntoGiraffeUsedSuccess,
        mountGiraffeUsedSuccess,
        stepIntoTreesUsedSuccess
    ]
);
