import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient & GMCPServiceClient;

export const huntingManagerSetTargetCaller = new AliasItem(
    'Hunting Manager Set Target Caller',
    /^(?:hm|hunting\-manager|hunting manager) set(?: ?target)? ?caller ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingmanager.settings.enabled) {
                    const targetCallerName = args[1];

                    client.huntingmanager.target.setTargetCaller(targetCallerName);
                }
            }
        )
    ]
);
