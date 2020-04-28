import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Tarot } from './Tarot';
import { Butchering } from './Butchering';
import { Gathering } from './Gathering';
import { Harvesting } from './Harvesting';
import { Inkmilling } from './Inkmilling';
import { Transmutation } from './Transmutation';

createFromFile(
    [
        onLoad,
        Butchering,
        Gathering,
        Harvesting,
        Inkmilling,
        Transmutation,
        Tarot
    ],
    'skill-manager/rpconfig.json'
);
