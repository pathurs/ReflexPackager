import { InventoryManagerClient } from '../inventory-manager';
import { FunctionItem } from '../../source';

declare const client: InventoryManagerClient;

export const save = new FunctionItem(
    'inventory-manager:save',
    function () {
        set_variable('inventory-manager:enabled', client.inventorymanager.enabled);
        set_variable('inventory-manager:items', client.inventorymanager.items);
        set_variable('inventory-manager:wielding', client.inventorymanager.wielding);
        set_variable('inventory-manager:wearables', client.inventorymanager.wearables);
        set_variable('inventory-manager:groupables', client.inventorymanager.groupables);
        set_variable('inventory-manager:containers', client.inventorymanager.containers);
        set_variable('inventory-manager:corpses', client.inventorymanager.corpses);
    }
);
