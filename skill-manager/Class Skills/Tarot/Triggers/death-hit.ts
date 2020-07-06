import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new TriggerItem(
    'CHANGEME',
    /^An almost unbearable feeling of emptiness heralds the arrival of a cloaked and hooded figure carrying a blood - stained sickle. ([A-Z][a-z]+) gasps in terror as a skeletal hand emerges from the sleeve and points at her.She bows her head to the inevitable as the manifestation of Death swings its sickle at her neck\. You watch in fascinated horror as she is gathered to Death's cold bosom\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.tarot.active) {
                    client.skillManager.onAbility('tarot', 'CHANGEME', 'CHANGEME', args);
                }
            }
        )
    ]
);
