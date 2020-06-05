import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const huntingManagerStop = new AliasItem(
    'Hunting Manager Stop',
    /^(?:hm|hunting\-manager|hunting manager) stop$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.huntingManager.settings.enabled) {
                    client.huntingManager.stop();
                }
            }
        )
    ]
);
