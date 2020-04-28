import { GroupItem } from '../../source';
import { killedMonster } from './killed-monster';
import { hitMonsterShield } from './hit-monster-shield';
import { monsterShielded } from './monster-shielded';

export const Triggers = new GroupItem(
    'Triggers',
    [
        hitMonsterShield,
        killedMonster,
        monsterShielded
    ]
);
