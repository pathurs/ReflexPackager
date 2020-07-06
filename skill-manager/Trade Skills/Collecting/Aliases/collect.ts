import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient & GMCPServiceClient;

export const collect = new AliasItem(
    'Collect',
    /^collect$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillManager.skills.trade.collecting.start();
            }
        )
    ]
);
