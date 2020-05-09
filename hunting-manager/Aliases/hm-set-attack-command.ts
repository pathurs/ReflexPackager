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
                if (client.huntingmanager.settings.enabled) {
                    const command = args[1];

                    if (!command.includes('%1')) {
                        client.huntingmanager.error(`Attack command must include '%lightgray%%1%end%' to properly attack.`);
                        client.huntingmanager.echo(`For example: '%lightgray%kick %1%end%'.`);

                        return;
                    }

                    client.huntingmanager.attack.setAttackCommand(command);
                }
            }
        )
    ]
);
