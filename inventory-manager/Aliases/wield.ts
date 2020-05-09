import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient;

export const wield = new AliasItem(
    'Wield',
    /^wield (?:(left|right) ?)?([\w\d]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1?: 'left' | 'right'; 2: string }) {
                client.inventorymanager.wield(args[2], args[1]);
            }
        )
    ]
);
