import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Functions } from './Functions';
import { onGMCP } from './onGMCP';

createFromFile(
    [
        onGMCP,
        onLoad,
        Functions
    ],
    'gmcp-service/rpconfig.json'
);
