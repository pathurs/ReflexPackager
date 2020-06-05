import { createFromFile } from '../source';
import { onLoad } from './onLoad';

createFromFile(
    [
        onLoad
    ],
    'affliction-manager/rpconfig.json'
);
