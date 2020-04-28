import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const unwieldFailed = new TriggerItem(
    'Unwield Failed',
    [
        /^You aren't wielding that\.$/,
        /^You aren't wielding anything\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.wielding.expectdUnwield = undefined;

                client.inventorymanager.save();
            }
        )
    ]
);



