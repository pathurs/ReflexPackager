import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';

declare const client: ShopManagerClient;

export const shopManagerDo = new AliasItem(
    'Shop Manager Do',
    /^(?:sm|shop\-manager|shop manager) do ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                const command = args[1];

                client.shopManager.do(command);
            }
        )
    ]
);
