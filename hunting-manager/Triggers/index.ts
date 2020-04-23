import { GroupItem } from '../../source';
import { killedMonster } from './killed-monster';

export const Triggers = new GroupItem(
    'Triggers',
    [
        killedMonster
    ]
);
