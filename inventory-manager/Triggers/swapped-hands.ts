import { MultiTriggerItem, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const swappedHands = new MultiTriggerItem(
    'Swapped Hands',
    [
        /^You exchange the contents of your hands and begin wielding ([\w\W]+)? in your left hand and ([\w\W]+)? in your right\.$/,
        /^You shift ([\w\W]+)? from your (right|left) to (right|left) hand\.$/
    ],
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.expectdSwapHands = undefined;

                client.inventorymanager.save();
            }
        )
    ]
);
