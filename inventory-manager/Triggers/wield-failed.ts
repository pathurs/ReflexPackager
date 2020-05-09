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
                client.inventorymanager.expectedWield = undefined;
                client.inventorymanager.expectdUnwield = undefined;


                client.inventorymanager.save();
            }
        )
    ]
);



