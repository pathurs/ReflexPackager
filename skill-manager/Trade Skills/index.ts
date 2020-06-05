import { GroupItem } from '../../source';
import { Gathering } from './Gathering';
import { Harvesting } from './Harvesting';
import { Inkmilling } from './Inkmilling';
import { Transmutation } from './Transmutation';
import { Collecting } from './Collecting';

export const TradeSkills = new GroupItem(
    'Trade Skills',
    [
        Collecting,
        Gathering,
        Harvesting,
        Inkmilling,
        Transmutation
    ]
);
