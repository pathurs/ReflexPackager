import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';

declare const client: ShopManagerClient;

export const reportProfits = new TriggerItem(
    'Report Profits',
    /^Profits for this period were tallied, with a result of (\d+) gold sovereigns? deposited into the stockroom\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                client.shopManager.echo(JSON.stringify(args));
            }
        )
    ]
);



