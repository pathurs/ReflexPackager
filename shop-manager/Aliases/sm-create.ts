import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerCreate = new AliasItem(
    'Shop Manager Create',
    /^(?:sm|shop\-manager|shop manager) create/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs) {
                const parts = args[1]?.trim().toLowerCase().split(' ') || [];
                const command = parts.join(' ');

                client.shopmanager.echo(`test ${parts} ${command}`);
            }
        )
    ]
);
