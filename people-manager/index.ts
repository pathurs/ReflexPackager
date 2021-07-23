import { createFromFile } from '../source';
import { Aliases } from './Aliases';
import { Triggers } from './Triggers';
import { onBlock } from './on-block';
import { onLoad } from './on-load';

createFromFile(
    [
        Aliases,
        Triggers,
        onBlock,
        onLoad,
    ],
    'people-manager/rpconfig.json'
);
