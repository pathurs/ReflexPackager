import { GroupItem } from '../../../../../source';
import { butchered } from './butchered';
import { cantButcher } from './cant-butcher';
import { butcherFailed } from './butcher-failed';

export const Triggers = new GroupItem(
    'Triggers',
    [
        butcherFailed,
        butchered,
        cantButcher
    ]
);
