import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const huntingManager = new AliasItem(
    'Hunting Manager',
    /^(?:hm|hunting\-manager|hunting manager)( [\w\W]+)?/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs) {
                const parts = args[1]?.trim().split(' ') || [];

                switch (parts[0]) {
                    case 'start':
                        client.huntingmanager.start();
                        break;

                    case 'stop':
                        client.huntingmanager.stop();
                        break;
                }
            }
        )
    ]
);
