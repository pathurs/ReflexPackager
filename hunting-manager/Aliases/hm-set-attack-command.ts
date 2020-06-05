import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient;

export const huntingManagerSetAttackCommand = new AliasItem(
    'Hunting Manager Set Attack Command',
    /^(?:hm|hunting\-manager|hunting manager)(?: set)? attack ?command ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingManager.settings.enabled) {
                    const command = args[1];

                    client.huntingManager.attack.setAttackCommand(command);
                }
            }
        )
    ]
);
