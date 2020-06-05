import { ExecuteScriptAction, MultiTriggerItem } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const unwieldFailed = new MultiTriggerItem(
    'Unwield Failed',
    [
        /^You aren't wielding that\.$/,
        /^You aren't wielding anything\.$/
    ],
    [
        new ExecuteScriptAction(
            function () {
                client.inventoryManager.expectdUnwield = undefined;

                client.inventoryManager.save();
            }
        )
    ]
);



