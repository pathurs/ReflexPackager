import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { TradeSkills } from './Trade Skills';
import { ClassSkills } from './Class Skills';
import { GeneralSkills } from './General Skills';

createFromFile(
    [
        ClassSkills,
        GeneralSkills,
        TradeSkills,
        onLoad
    ],
    'skill-manager/rpconfig.json'
);
