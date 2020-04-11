import { FunctionItem } from '../source';
import { GMCPServiceClient } from './gmcp-service';

declare const client: GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        run_function('gmcp-service:setup', undefined, 'GMCP Service');
        send_GMCP('Char.Items.Room');

        display_notice('GMCP Service Loaded.');
    }
);
