import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient;

export const huntingManagerSetShieldCommand = new AliasItem(
    'Hunting Manager Set Shield Command',
    /^(?:hm|hunting\-manager|hunting manager)(?: set)? shield ?command ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingmanager.settings.enabled) {
                    const command = args[1];

                    client.huntingmanager.shield.setShieldCommand(command);
                }
            }
        )
    ]
);
