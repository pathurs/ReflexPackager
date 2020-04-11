import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const wieldWhat = new TriggerItem(
    'What do you wish to wield?',
    TriggerType.ExactMatch,
    [
        new ExecuteScriptAction(
            function () {
                client.inventorymanager.wielding.expectdWield = undefined;
                client.inventorymanager.wielding.expectdUnwield = undefined;
            }
        )
    ]
);



