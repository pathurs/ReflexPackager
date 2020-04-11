import { FunctionItem } from '../source';
import { HuntingManagerClient } from './hunting-manager';
import { GMCPServiceClient } from '../gmcp-service/gmcp-service';

declare const client: HuntingManagerClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        run_function('hunting-manager:setup', undefined, 'Hunting Manager');
        send_GMCP('Char.Items.Room');

        client.gmcpservice.subscribe(['Char.Items.List', 'Char.Items.Add', 'Char.Items.Remove', 'Char.Items.Update'], (args) => {
            if (args.gmcp_args.location === 'room') {
                run_function('hunting-manager:onRoomChange', args, 'Hunting Manager');
            }
        });

        display_notice('Hunting Manager Loaded.');
    }
);
