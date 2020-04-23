import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Aliases } from './Aliases';
import { Triggers } from './Triggers';

createFromFile(
    [
        onLoad,
        Aliases,
        Triggers
    ],
    'hunting-manager/rpconfig.json'
);
