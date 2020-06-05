import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';

declare const client: ShopManagerClient;

export const shopManagerUpdateStockroom = new AliasItem(
    'Shop Manager Update Stockroom',
    /^(?:sm|shop\-manager|shop manager) update ?(?:stockroom)?$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.shopManager.updateStockroom();
            }
        )
    ]
);
