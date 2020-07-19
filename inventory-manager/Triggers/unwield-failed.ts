import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const unwieldFailed = new TriggerItem(
    'Unwield Failed',
    [
        /^You aren't wielding that\.$/,
        /^You aren't wielding anything\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function () {
                client.inventoryManager.expectdUnwield = undefined;

                client.inventoryManager.save();
            }
        )
    ]
);



