import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Butchering } from './Butchering';
import { Gathering } from './Gathering';
import { Harvesting } from './Harvesting';
import { Inkmilling } from './Inkmilling';
import { Transmutation } from './Transmutation';
import { General } from './General';

createFromFile(
    [
        onLoad,
        General,
        Butchering,
        Gathering,
        Harvesting,
        Inkmilling,
        Transmutation
    ],
    'tradeskill-manager/rpconfig.json'
);
