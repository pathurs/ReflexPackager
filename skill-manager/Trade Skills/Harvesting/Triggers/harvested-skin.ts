import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const harvestedSkin = new TriggerItem(
    'Harvested Skin',
    /^You reach down and carefully peel off two long strips of skin from the dead sidewinder\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                client.skillManager.skills.trade.collecting.onCollected(args);
            }
        )
    ]
);
