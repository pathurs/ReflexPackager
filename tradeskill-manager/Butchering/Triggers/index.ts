import { GroupItem } from '../../../source';
import { butchered } from './butchered';
import { cantButcher } from './cant-butcher';

export const Triggers = new GroupItem(
    'Triggers',
    [
        butchered,
        cantButcher
    ]
);
