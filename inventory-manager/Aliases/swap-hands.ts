import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const swapHands = new AliasItem(
    'Swap Hands',
    /^swap hands$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                send_command('swap hands', 1);

                const expectdLeft = client.inventorymanager.wielding.expectedLeftId;
                const expectdRight = client.inventorymanager.wielding.expectdRightId;

                client.inventorymanager.wielding.expectedLeftId = expectdRight;
                client.inventorymanager.wielding.expectdRightId = expectdLeft;

                client.inventorymanager.wielding.expectdSwapHands = true;

                run_function('inventory-manager:save', undefined, 'Inventory Manager');
            }
        )
    ]
);
