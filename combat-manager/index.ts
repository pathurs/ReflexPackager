import { createFromFile } from '../source';
import { onLoad } from './onLoad';

createFromFile(
    [
        onLoad
    ],
    'combat-manager/rpconfig.json'
);
