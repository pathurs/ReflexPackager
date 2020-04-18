import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const unlashFailed = new TriggerItem(
    'Unlash Failed',
    /^You do not have a free hand with which to unlash a shield\.$/,
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



