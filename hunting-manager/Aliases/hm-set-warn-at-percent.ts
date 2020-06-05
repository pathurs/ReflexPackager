import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient;

export const huntingManagerSetWarnAtPercent = new AliasItem(
    'Hunting Manager Set Warn At Percent',
    /^(?:hm|hunting\-manager|hunting manager)(?: set)? warn ?at(?: ?percent)? (\d+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingManager.settings.enabled) {
                    const percent = Number(args[1]);

                    client.huntingManager.warn.setWarnAtPercent(percent);
                }
            }
        )
    ]
);
