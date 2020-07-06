import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^You sniff the card of Death\. The image of Death has been shown to ([A-Z][a-z]+) (\d+) times\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string }) {
                if (client.skillManager.skills.class.tarot.active) {
                    client.skillManager.onAbility('tarot', 'CHANGEME', 'CHANGEME', args);
                }
            }
        )
    ]
);
