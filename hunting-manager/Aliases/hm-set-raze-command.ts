import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient;

export const huntingManagerSetRazeCommand = new AliasItem(
    'Hunting Manager Set Raze Command',
    /^(?:hm|hunting\-manager|hunting manager)(?: set)? raze ?command ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingManager.settings.enabled) {
                    const command = args[1];

                    client.huntingManager.raze.setRazeCommand(command);
                }
            }
        )
    ]
);
