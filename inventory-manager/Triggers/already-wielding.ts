import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const alreadyWielding = new TriggerItem(
    'You are already wielding that.',
    TriggerType.ExactMatch,
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.wielding.expectdWield = undefined;
            }
        )
    ]
);
