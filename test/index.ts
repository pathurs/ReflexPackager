import { createFromFile } from '../source/create'
import { FunctionItem } from '../source/function';

createFromFile(
    [
        new FunctionItem(
            'onLoad',
            function () {
                // onLoad
            }
        ),
        new FunctionItem(
            'onGMCP',
            function () {
                // onGMCP
            }
        )
    ],
    'test/rpconfig.json'
);
