import { GroupItem } from '../../source';
import { clearedAllQueue } from './cleared-all-queues';
import { clearedQueue } from './cleared-queue';
import { inserted } from './inserted';
import { manuallyAdded } from './manually-added';
import { prepended } from './prepended';
import { removed } from './removed';
import { replaced } from './replaced';
import { running } from './running';
import { automaticallyAdded } from './automatically-added';

export const Triggers = new GroupItem(
    'Triggers',
    [
        automaticallyAdded,
        clearedAllQueue,
        clearedQueue,
        inserted,
        manuallyAdded,
        prepended,
        removed,
        replaced,
        running
    ]
);
