import { FunctionItem } from '../source';

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        // onLoad
        client.display_notice;
        display_notice('test');
    }
);
