import { createFromFile } from '../source';
import { onLoad } from './onLoad';

createFromFile(
    [
        onLoad
    ],
    'display-service/rpconfig.json'
);
