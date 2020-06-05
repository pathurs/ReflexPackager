import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient & GMCPServiceClient;

export const huntingManagerRemoveMob = new AliasItem(
    'Hunting Manager Remove Mob',
    /^(?:hm|hunting\-manager|hunting manager) remove(?: ?mob)? ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                if (client.huntingManager.settings.enabled) {
                    const mob = args[1];

                    client.huntingManager.removeMob(client.gmcpService.room.area, mob);
                }
            }
        )
    ]
);
