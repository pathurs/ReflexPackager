import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { onGMCP } from './onGMCP';

createFromFile(
    [
        onGMCP,
        onLoad
    ],
    'gmcp-service/rpconfig.json'
);
