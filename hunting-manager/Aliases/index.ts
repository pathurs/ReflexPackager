import { GroupItem } from '../../source';
import { huntingManagerAddMob } from './hm-add-mob';
import { huntingManagerSetAttackCommand } from './hm-set-attack-command';
import { huntingManagerSetFleeAtPercent } from './hm-set-flee-at-percent';
import { huntingManagerSetRazeCommand } from './hm-set-raze-command';
import { huntingManagerSetShieldAtPercent } from './hm-set-shield-at-percent';
import { huntingManagerSetShieldCommand } from './hm-set-shield-command';
import { huntingManagerSetWarnAtPercent } from './hm-set-warn-at-percent';
import { huntingManagerStart } from './hm-start';
import { huntingManagerStop } from './hm-stop';
import { percentToLevel } from './percent-to-level';

export const Aliases = new GroupItem(
    'Aliases',
    [
        huntingManagerAddMob,
        huntingManagerSetAttackCommand,
        huntingManagerSetFleeAtPercent,
        huntingManagerSetRazeCommand,
        huntingManagerSetShieldAtPercent,
        huntingManagerSetShieldCommand,
        huntingManagerSetWarnAtPercent,
        huntingManagerStart,
        huntingManagerStop,
        percentToLevel
    ]
);
