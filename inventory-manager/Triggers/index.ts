import { GroupItem } from '../../source';
import { swappedHands } from './swapped-hands';
import { wieldFailed } from './wield-failed';
import { containerClosed } from './container-closed';
import { containerOpened } from './container-opened';
import { notCloseable } from './not-closeable';
import { alreadyClosed } from './already-closed';
import { alreadyOpen } from './already-open';

export const Triggers = new GroupItem(
    'Triggers',
    [
        alreadyClosed,
        alreadyOpen,
        containerClosed,
        containerOpened,
        notCloseable,
        swappedHands,
        wieldFailed
    ]
);
