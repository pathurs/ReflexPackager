import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from 'inventory-manager/inventory-manager';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient & GMCPServiceClient & InventoryManagerClient;

export const butcher = new AliasItem(
    'Butcher',
    /^butcher$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillManager.gathering.butchering.start();
            }
        )
    ]
);
