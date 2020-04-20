import { GroupItem } from '../../source';
import { Functions } from './Functions';
import { Triggers } from './Triggers';

export const General = new GroupItem(
    'General',
    [
        Functions,
        Triggers
    ]
);
