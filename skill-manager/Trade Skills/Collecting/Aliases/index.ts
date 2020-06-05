import { GroupItem } from '../../../../source';
import { collect } from './collect';
import { collectAutomatically } from './collect-automatically';

export const Aliases = new GroupItem(
    'Aliases',
    [
        collectAutomatically,
        collect
    ]
);
