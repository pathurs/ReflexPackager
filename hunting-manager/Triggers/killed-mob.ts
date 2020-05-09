import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & GMCPServiceClient;

export const killedMob = new TriggerItem(
    'Killed Mob',
    /^You have slain ([\w\W]+), retrieving the corpse\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.huntingmanager.settings.enabled) {
                    client.huntingmanager.addMob(client.gmcpservice.room.area, args[1]);
                }
            }
        )
    ]
);



