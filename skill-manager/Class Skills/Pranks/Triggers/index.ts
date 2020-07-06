import { GroupItem } from '../../../../source';
import { backflipUsed } from './backflip-used';
import { propsList } from './props-list';
import { propsWishForBalloon } from './props-wish-for-balloon';
import { propsWishForItchpowder } from './props-wish-for-itchpowder.';
import { propsWishForFail } from './props-wish-for-fail';
import { propsWishForMickey } from './props-wish-for-mickey';

export const Triggers = new GroupItem(
    'Triggers',
    [
        backflipUsed,
        propsList,
        propsWishForBalloon,
        propsWishForFail,
        propsWishForItchpowder,
        propsWishForMickey
    ]
);
