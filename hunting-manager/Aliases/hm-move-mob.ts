import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient & GMCPServiceClient;

export const huntingManagerMoveMob = new AliasItem(
    'Hunting Manager Move Mob',
    /^(?:hm|hunting\-manager|hunting manager) move(?: ?mob)? ([\w\W]+) (\d+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string; 2: string }) {
                if (client.huntingmanager.settings.enabled) {
                    const mob = args[1];
                    const index = Number(args[2]);

                    client.huntingmanager.moveMob(client.gmcpservice.room.area, mob, index);
                }
            }
        )
    ]
);
