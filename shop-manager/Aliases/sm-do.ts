import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerDo = new AliasItem(
    'Shop Manager Do',
    /^(?:sm|shop\-manager|shop manager) do ([\w\W]*)/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs) {
                const parts = args[1]?.trim().toLowerCase().split(' ') || [];

                const command = parts.join(' ');

                if (!command) {
                    client.shopmanager.error(`You need to specify a command.`);

                    return;
                }

                client.shopmanager.echo(`Doing: '%white%${command}%end%'.`)

                send_command(`unlock door down|open door down|down|close door up|lock door up`, 1);
                send_command(command, 1);
                send_command(`unlock door up|open door up|up|close door down|lock door down`, 1);
            }
        )
    ]
);
