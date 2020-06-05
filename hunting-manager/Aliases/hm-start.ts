import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const huntingManagerStart = new AliasItem(
    'Hunting Manager Start',
    /^(?:hm|hunting\-manager|hunting manager) start$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.huntingManager.settings.enabled) {
                    client.huntingManager.start();
                }
            }
        )
    ]
);
