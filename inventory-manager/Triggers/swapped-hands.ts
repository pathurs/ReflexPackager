import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const swappedHands = new TriggerItem(
    'Swapped Hands',
    [
        /^You exchange the contents of your hands and begin wielding ([\w\W]+)? in your left hand and ([\w\W]+)? in your right\.$/,
        /^You shift ([\w\W]+)? from your (right|left) to (right|left) hand\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.wielding.expectdSwapHands = undefined;

                run_function('inventory-manager:save', undefined, 'Inventory Manager');
            }
        )
    ]
);
