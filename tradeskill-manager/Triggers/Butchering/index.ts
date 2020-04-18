import { GroupItem } from '../../../source';
import { butchered } from './butchered';
import { cantButcher } from './cant-butcher';

export const Butchering = new GroupItem(
    'Butchering',
    [
        butchered,
        cantButcher
    ]
);
