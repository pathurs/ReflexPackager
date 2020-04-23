import { GroupItem } from '../../source';
import { huntingManager } from './hunting-manager';
import { percentToLevel } from './percent-to-level';

export const Aliases = new GroupItem(
    'Aliases',
    [
        huntingManager,
        percentToLevel
    ]
);
