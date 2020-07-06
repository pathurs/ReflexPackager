import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient & GMCPServiceClient;

export const collectAutomatically = new AliasItem(
    'Collect Automatically',
    /^collect ?(?:auto|automatic|automatically)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                const wasAutomatic = client.skillManager.skills.trade.collecting.automatic;

                client.skillManager.skills.trade.collecting.automatic = !client.skillManager.skills.trade.collecting.automatic;

                if (wasAutomatic) {
                    client.skillManager.echo(`Will no longer automatically start collecting in each room.`);
                }
                else {
                    client.skillManager.echo(`Will now automatically start collecting in each room.`);

                    client.skillManager.skills.trade.collecting.start();
                }
            }
        )
    ]
);
