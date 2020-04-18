import { GroupItem } from '../../source';
import { butcher } from './butcher';
import { harvest } from './harvest';
import { gather } from './gather';
import { extract } from './extract';
import { mill } from './mill';

export const Aliases = new GroupItem(
    'Aliases',
    [
        butcher,
        extract,
        gather,
        harvest,
        mill
    ]
);
