import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service'
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient;

export const unwield = new AliasItem(
    'Unwield',
    /^unwield (left|right|[\w\d]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: 'left' | 'right' | string }) {
                client.inventoryManager.unwield(args[1]);
            }
        )
    ]
);
