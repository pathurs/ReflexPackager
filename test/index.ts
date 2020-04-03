import { createFromFile } from '../source/create'
import { FunctionItem } from '../source/function';

createFromFile(
    [
        new FunctionItem('onLoad', '// onLoad'),
        new FunctionItem('onGMCP', '// onGMCP')
    ],
    'test/rpconfig.json'
);
