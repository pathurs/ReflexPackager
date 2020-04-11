import { InventoryManagerClient } from '../inventory-manager';
import { FunctionItem } from '../../source';

declare const client: InventoryManagerClient;

export const setup = new FunctionItem(
    'inventory-manager:setup',
    function () {
        const enabled: boolean | undefined = get_variable('inventory-manager:enabled');

        client.inventorymanager = get_variable('inventory-manager:config') || {
            enabled: enabled != undefined ? enabled : true,
            items: get_variable('inventory-manager:items') || [],
            wielding: get_variable('inventory-manager:wielding') || {
                enabled: true
            },
            wearables: get_variable('inventory-manager:wearables') || {
                enabled: true,
                expectedIds: []
            },
            groupables: get_variable('inventory-manager:groupables') || {
                enabled: true
            },
            containers: get_variable('inventory-manager:containers') || {
                enabled: true,
                trackedIds: []
            },
            corpses: get_variable('inventory-manager:corpses') || {
                enabled: true
            },
        };
    }
);
