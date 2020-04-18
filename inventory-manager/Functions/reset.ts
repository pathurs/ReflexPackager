import { InventoryManagerClient } from '../inventory-manager';
import { FunctionItem } from '../../source';

declare const client: InventoryManagerClient;

export const reset = new FunctionItem(
    'inventory-manager:reset',
    function () {
        client.inventorymanager = {
            enabled: true,
            items: [],
            wielding: {
                enabled: true
            },
            wearables: {
                enabled: true,
                expectedIds: []
            },
            groupables: {
                enabled: true
            },
            containers: {
                enabled: true,
                tracked: []
            },
            corpses: {
                enabled: true
            },
        };

        run_function('inventory-manager:save', undefined, 'Inventory Manager');

        send_GMCP('Char.Items.Inv');

        display_notice('Inventory Manager: Reset.');
    }
);
