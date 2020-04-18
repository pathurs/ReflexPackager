import { createFromFile } from '../source';
import { onLoad } from './onLoad';
import { Aliases } from './Aliases';
import { Triggers } from './Triggers';
import { Functions } from './Functions';

createFromFile(
    [
        onLoad,
        Aliases,
        Functions,
        Triggers
    ],
    'tradeskill-manager/rpconfig.json'
);
