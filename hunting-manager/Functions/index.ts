import { GroupItem } from '../../source';
import { setup } from './setup';
import { onRoomChange } from './on-room-change';

export const Functions = new GroupItem(
    'Functions',
    [
        onRoomChange,
        setup
    ]
);
