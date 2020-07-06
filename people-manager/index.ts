import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Triggers } from './Triggers';

createFromFile(
    [
        onLoad,
        Triggers
    ],
    'people-manager/rpconfig.json'
);
