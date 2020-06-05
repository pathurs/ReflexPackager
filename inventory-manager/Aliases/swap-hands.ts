import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient;

export const swapHands = new AliasItem(
    'Swap Hands',
    /^swap hands$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.systemService.sendCommand('swap hands');

                const expectdLeft = client.inventoryManager.settings.wielding.expectedLeftId;
                const expectdRight = client.inventoryManager.settings.wielding.expectedRightId;

                client.inventoryManager.settings.wielding.expectedLeftId = expectdRight;
                client.inventoryManager.settings.wielding.expectedRightId = expectdLeft;

                client.inventoryManager.expectdSwapHands = true;

                client.inventoryManager.save();
            }
        )
    ]
);
