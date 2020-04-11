import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const arentWielding = new TriggerItem(
    `You aren't wielding anything.`,
    TriggerType.ExactMatch,
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.wielding.expectdUnwield = undefined;
            }
        )
    ]
);
