import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';

declare const client: ShopManagerClient;

export const reportRead = new TriggerItem(
    'Report Read',
    /^Stockroom report, penned upon the (\d+)(?:st|nd|rd|th) of (\w+), (\d+) AF:$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string; 3: string }) {
                client.shopManager.echo(JSON.stringify(args));
            }
        )
    ]
);



