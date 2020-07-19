import { GroupItem } from '../../../../../source';
import { props } from './props';
import { wishForBalloonUsedSuccess } from './wish-for-balloon-used-success';
import { wishForItchpowderUsedSuccess } from './wish-for-itchpowder-used-success';
import { wishForMickeyUsedSuccess } from './wish-for-mickey-used-success';
import { wishForUsedFail } from './wish-for-used-fail';

export const Triggers = new GroupItem(
    'Triggers',
    [
        props,
        wishForBalloonUsedSuccess,
        wishForItchpowderUsedSuccess,
        wishForMickeyUsedSuccess,
        wishForUsedFail
    ]
);
