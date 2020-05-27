import { GroupItem } from '../../source';
import { automaticallyAdded } from './automatically-added';
import { clearedAllQueue } from './cleared-all-queues';
import { clearedQueue } from './cleared-queue';
import { inserted } from './inserted';
import { manuallyAdded } from './manually-added';
import { prepended } from './prepended';
import { queueAlreadyEmpty } from './queue-already-empty';
import { removed } from './removed';
import { replaced } from './replaced';
import { running } from './running';

export const Triggers = new GroupItem(
    'Triggers',
    [
        automaticallyAdded,
        clearedAllQueue,
        clearedQueue,
        inserted,
        manuallyAdded,
        prepended,
        queueAlreadyEmpty,
        removed,
        replaced,
        running
    ]
);
