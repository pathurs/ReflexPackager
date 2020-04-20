import { GroupItem } from '../../../source';
import { checkMissingItem } from './check-missing-item';
import { systemQueueAdd } from './system-queue-add';
import { systemQueueRemove } from './system-queue-remove';
export const Triggers = new GroupItem(
    'Triggers',
    [
        checkMissingItem, // Temporary
        systemQueueAdd,
        systemQueueRemove
    ]
);
