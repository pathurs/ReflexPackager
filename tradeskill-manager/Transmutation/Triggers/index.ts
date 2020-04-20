import { GroupItem } from '../../../source';
import { cantExtract } from './cant-extract';
import { extracted } from './extracted';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantExtract,
        extracted
    ]
);
