import { GroupItem } from '../../source';
import { cli } from './cli';
import { cliContainers } from './cli-containers';
import { cliShow } from './cli-show';

export const Functions = new GroupItem(
    'Functions',
    [
        cli,
        cliContainers,
        cliShow
    ]
);
