import { GroupItem } from '../../source';
import { Pranks } from './Pranks';
import { Tarot } from './Tarot';
import { Tekura } from './Tekura';
import { Telepathy } from './Telepathy';

export const ClassSkills = new GroupItem(
    'Class Skills',
    [
        Pranks,
        Tarot,
        Tekura,
        Telepathy
    ]
);
