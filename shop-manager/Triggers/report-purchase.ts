import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';

declare const client: ShopManagerClient;

export const reportPurchase = new TriggerItem(
    'Report Purchase',
    /^Someone purchased ([\w\W]+) \((\d+)\) for (\d+) gold\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string; 3: string }) {
                client.shopManager.echo(JSON.stringify(args));
            }
        )
    ]
);



