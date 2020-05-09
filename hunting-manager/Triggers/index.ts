import { GroupItem } from '../../source';
import { killedMob } from './killed-mob';
import { hitMobShield } from './hit-mob-shield';
import { mobShielded } from './mob-shielded';
import { notProne } from './not-prone';
import { grace } from './grace';

export const Triggers = new GroupItem(
    'Triggers',
    [
        grace,
        hitMobShield,
        killedMob,
        mobShielded,
        notProne
    ]
);
