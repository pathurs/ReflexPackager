import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Tarot } from './Tarot';
import { Gathering } from './Gathering';
import { Harvesting } from './Harvesting';
import { Inkmilling } from './Inkmilling';
import { Transmutation } from './Transmutation';
import { Collecting } from './Collecting';

createFromFile(
    [
        onLoad,
        Collecting,
        Gathering,
        Harvesting,
        Inkmilling,
        Transmutation,
        Tarot
    ],
    'skill-manager/rpconfig.json'
);
