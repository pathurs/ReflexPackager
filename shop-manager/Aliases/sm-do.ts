import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { ShopManagerClient } from 'shop-manager/shop-manager';

declare const client: ShopManagerClient & SystemServiceClient & GMCPServiceClient;

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

                client.shopmanager.echo(`Doing: '%lightgray%${command}%end%'.`)

                client.systemservice.sendCommand(`unlock door down|open door down|down|close door up|lock door up`);
                client.systemservice.sendCommand(command);
                client.systemservice.sendCommand(`unlock door up|open door up|up|close door down|lock door down`);
            }
        )
    ]
);
