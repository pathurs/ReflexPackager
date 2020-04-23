import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const wieldFailed = new TriggerItem(
    'Wield Failed',
    [
        /^What do you wish to wield\?$/,
        /^You are already wielding that\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.wielding.expectdWield = undefined;
                client.inventorymanager.wielding.expectdUnwield = undefined;

                run_function('inventory-manager:save', undefined, 'Inventory Manager');
            }
        )
    ]
);


