import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Triggers } from './Triggers';
import { onBlock } from './on-block';

createFromFile(
    [
        onBlock,
        onLoad,
        Triggers
    ],
    'people-manager/rpconfig.json'
);
