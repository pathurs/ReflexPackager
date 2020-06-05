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
                const id = args[1];
                const name = args[2];

                if (!['0', '1', '2', '3', '4', '5', '6', '7'].includes(id)) {
                    client.shopManager.error(`Bin ID '${id}' is invalid. The bin ID must be a whole number between 0 and 7.`);

                    return;
                }

                client.shopManager.setBinName(<keyof ShopBins>id, name);
            }
        )
    ]
);
