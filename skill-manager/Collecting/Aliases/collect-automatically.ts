import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
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
                const wasAutomatic = client.skillmanager.collecting.automatic;

                client.skillmanager.collecting.automatic = !client.skillmanager.collecting.automatic;

                if (wasAutomatic) {
                    client.skillmanager.echo(`Will no longer automatically start collecting in each room.`);
                }
                else {
                    client.skillmanager.echo(`Will now automatically start collecting in each room.`);

                    client.skillmanager.collecting.start();
                }
            }
        )
    ]
);
