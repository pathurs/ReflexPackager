import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerShopRegister = new AliasItem(
    'Shop Manager Shop Register',
    /^(?:sm|shop\-manager|shop manager) shop register$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.shopmanager.registerShop();
            }
        )
    ]
);
