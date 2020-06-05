import { ExecuteScriptAction, MultiTriggerItem } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const wieldFailed = new MultiTriggerItem(
    'Wield Failed',
    [
        /^What do you wish to wield\?$/,
        /^You are already wielding that\.$/
    ],
    [
        new ExecuteScriptAction(
            function () {
                client.inventoryManager.expectedWield = undefined;
                client.inventoryManager.expectdUnwield = undefined;


                client.inventoryManager.save();
            }
        )
    ]
);



