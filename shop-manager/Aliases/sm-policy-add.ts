import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerPolicyAdd = new AliasItem(
    'Shop Manager Policy Add',
    /^(?:sm|shop\-manager|shop manager) policy add ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                const policy = client.shopManager.parseRawPolicy(args[1]);

                if (!policy) {
                    return;
                }

                client.shopManager.addPolicy(policy);
            }
        )
    ]
);
