import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient & SystemServiceClient & GMCPServiceClient;

export const huntingManagerShowArea = new AliasItem(
    'Hunting Manager Show Area',
    /^(?:hm|hunting\-manager|hunting manager) show ?area$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.huntingManager.settings.enabled) {
                    client.huntingManager.showArea(client.gmcpService.room.area);
                }
            }
        )
    ]
);
