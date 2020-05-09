import { GroupItem } from '../../source';
import { Triggers } from './Triggers';
import { Butchering } from './Butchering';

export const Gathering = new GroupItem(
    'Gathering',
    [
        Butchering,
        Triggers
    ]
);
