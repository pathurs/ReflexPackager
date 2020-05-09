import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient & GMCPServiceClient;

export const huntingManagerAddMob = new AliasItem(
    'Hunting Manager Add Mob',
    /^(?:hm|hunting\-manager|hunting manager) add(?: ?mod)? ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingmanager.settings.enabled) {
                    const mob = args[1];

                    client.huntingmanager.addMob(client.gmcpservice.room.area, mob);
                }
            }
        )
    ]
);
