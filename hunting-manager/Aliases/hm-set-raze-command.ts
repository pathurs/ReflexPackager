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
                if (client.huntingmanager.settings.enabled) {
                    const command = args[1];

                    if (!command.includes('%1')) {
                        client.huntingmanager.error(`Raze command must include '%lightgray%%1%end%' to properly raze.`);
                        client.huntingmanager.echo(`For example: '%lightgray%touch hammer %1%end%'.`);

                        return;
                    }

                    client.huntingmanager.raze.setRazeCommand(command);
                }
            }
        )
    ]
);
