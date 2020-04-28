import { GroupItem } from '../../../source';
import { cantExtract } from './cant-extract';
import { extracted } from './extracted';
import { mineralsMineral } from './minerals-mineral';
import { mineralsStart } from './minerals-start';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cantExtract,
        extracted,
        mineralsMineral,
        mineralsStart
    ]
);
