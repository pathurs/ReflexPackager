import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerPolicyRemove = new AliasItem(
    'Shop Manager Policy Remove',
    /^(?:sm|shop\-manager|shop manager) policy remove (\d+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                const id = Number(args[1]);

                client.shopManager.removePolicy(id);
            }
        )
    ]
);
