import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient, ShopBins } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerBinName = new AliasItem(
    'Shop Manager Bin Name',
    /^(?:sm|shop\-manager|shop manager) bin (\d+) name ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string, 2: string }) {
                const id = Number(args[1]);
                const name = args[2];

                client.shopmanager.setBinName(<keyof ShopBins>id, name);
            }
        )
    ]
);
