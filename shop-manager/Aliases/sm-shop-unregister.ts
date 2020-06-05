import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerShopUnregister = new AliasItem(
    'Shop Manager Shop Unregister',
    /^(?:sm|shop\-manager|shop manager) shop unregister$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.shopManager.unregisterShop();
            }
        )
    ]
);
