import { GroupItem } from '../../../source';
import { inrift } from './inrift';
import { runQueue } from './run-queue';

export const Functions = new GroupItem(
    'Functions',
    [
        inrift,
        runQueue
    ]
);
