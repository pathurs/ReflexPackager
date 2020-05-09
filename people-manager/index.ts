import { createFromFile } from '../source';
import { onLoad } from './onLoad';

createFromFile(
    [
        onLoad
    ],
    'people-manager/rpconfig.json'
);
