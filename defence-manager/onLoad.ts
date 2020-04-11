import { FunctionItem } from '../source';
import { DefenceManagerClient } from './defence-manager';
import { GMCPServiceClient } from '../gmcp-service/gmcp-service';

declare const client: DefenceManagerClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        run_function('defence-manager:setup', undefined, 'Defence Manager');
        // send_GMCP('Char.Items.Inv');

        client.gmcpservice.subscribe(['Char.Defences.List', 'Char.Defences.Add', 'Char.Defences.Remove'], args => {
            run_function('defence-manager:onDefenceChange', args, 'Defence Manager');
        });

        display_notice('Defence Manager Loaded.');
    }
);
