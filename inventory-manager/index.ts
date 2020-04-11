import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Aliases } from './Aliases';
import { Functions } from './Functions';
import { Triggers } from './Triggers';

createFromFile(
    [
        onLoad,
        Aliases,
        Functions,
        Triggers
    ],
    'inventory-manager/rpconfig.json'
);
