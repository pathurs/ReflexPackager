import { AliasItem, AliasType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { InventoryManagerClient } from 'inventory-manager/inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient;

export const getFrom = new AliasItem(
    'Get From',
    /^get ([\w\W]+?) from ([\w\W]+?)$/,
    AliasType.RegularExpression,
    [
        // new ExecuteScriptAction(
        //     function (args: TriggerFunctionArgs) {
        //         client.systemservice.sendCommand(args[0], 1);
        //     }
        // )
    ]
);
