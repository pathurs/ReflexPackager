import { FunctionItem } from '../source';
import { InventoryManagerClient } from './inventory-manager';
import { GMCPServiceClient } from '../gmcp-service/gmcp-service';

declare const client: InventoryManagerClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        run_function('inventory-manager:setup', undefined, 'Inventory Manager');

        send_GMCP('Char.Items.Inv');

        client.inventorymanager.containers.tracked.forEach(container => {
            send_GMCP('Char.Items.Contents', Number(container.id));
        });

        client.gmcpservice.subscribe(['Char.Items.List', 'Char.Items.Add', 'Char.Items.Remove', 'Char.Items.Update'], args => {
            if (args.gmcp_args.location === 'inv') {
                run_function('inventory-manager:onInventoryChange', args, 'Inventory Manager');
            }
            else if (args.gmcp_args.location.startsWith('rep')) {
                run_function('inventory-manager:onContentsChange', args, 'Inventory Manager');
            }
        });

        display_notice('Inventory Manager: Loaded.');
    }
);
