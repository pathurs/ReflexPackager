import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { InventoryManagerClient } from 'inventory-manager/inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient;

export const infoInventory = new AliasItem(
    'Info Inventory (ii)',
    /^ii$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.systemService.sendCommand('ii');

                send_GMCP('Char.Items.Inv');
            }
        )
    ]
);
