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
                client.systemservice.sendCommand('swap hands');

                const expectdLeft = client.inventorymanager.settings.wielding.expectedLeftId;
                const expectdRight = client.inventorymanager.settings.wielding.expectedRightId;

                client.inventorymanager.settings.wielding.expectedLeftId = expectdRight;
                client.inventorymanager.settings.wielding.expectedRightId = expectdLeft;

                client.inventorymanager.expectdSwapHands = true;

                client.inventorymanager.save();
            }
        )
    ]
);
