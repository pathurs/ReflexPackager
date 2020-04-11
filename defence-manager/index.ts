import { createFromFile } from '../source';
import { onLoad } from './onLoad';

createFromFile(
    [
        onLoad
    ],
    'defence-manager/rpconfig.json'
);
