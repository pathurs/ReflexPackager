import { createFromFile } from '../source';
import { onGMCP } from './onGMCP.function';
import { onLoad } from './onLoad.function';
import { Aliases } from './Aliases';

createFromFile(
    [
        onLoad,
        onGMCP,
        Aliases
    ],
    'test/rpconfig.json'
);
