import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient, ShopBins } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerBinVisibility = new AliasItem(
    'Shop Manager Bin Visibility',
    /^(?:sm|shop\-manager|shop manager) bin (\d+) visibility ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string, 2: string }) {
                const id = Number(args[1]);
                const visibility = client.shopmanager.parseRawBinVisibility(args[2]);

                if (!visibility) {
                    return;
                }

                client.shopmanager.setBinVisibility(<keyof ShopBins>id, visibility);
            }
        )
    ]
);
