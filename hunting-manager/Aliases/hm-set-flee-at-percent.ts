import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient;

export const huntingManagerSetFleeAtPercent = new AliasItem(
    'Hunting Manager Set Flee At Percent',
    /^(?:hm|hunting\-manager|hunting manager)(?: set)? flee ?at(?: ?percent)? (\d+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingmanager.settings.enabled) {
                    const percent = Number(args[1]);

                    client.huntingmanager.flee.setFleeAtPercent(percent);
                }
            }
        )
    ]
);
