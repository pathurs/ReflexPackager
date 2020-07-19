import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const balloonhandoffFly = new TriggerItem(
    'Balloonhandoff - Fly',
    /^([A-Z][a-z]+) is swiftly and unexpectedly carried up into the sky!$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'balloonhandoff', 'inflate balloon and give to', 'fly', args);
                }
            }
        )
    ]
);
