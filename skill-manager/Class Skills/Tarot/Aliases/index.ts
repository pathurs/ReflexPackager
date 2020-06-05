import { GroupItem } from '../../../../source';
import { inscribe } from './inscribe';
import { inscribeStop } from './inscribe-stop';
import { inscribeClear } from './inscribe-clear';

export const Aliases = new GroupItem(
    'Aliases',
    [
        inscribe,
        inscribeClear,
        inscribeStop
    ]
);
