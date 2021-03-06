import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const balloonhandoffUsedStart = new TriggerItem(
    'Balloonhandoff - Used Start',
    /^You inflate a balloon and give it to ([A-Z][a-z]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'balloonhandoff', 'inflate balloon and give to', ['used', 'start'], args);
                }
            }
        )
    ]
);
