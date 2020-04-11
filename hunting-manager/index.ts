import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Functions } from './Functions';

createFromFile(
    [
        onLoad,
        Functions
    ],
    'hunting-manager/rpconfig.json'
);
