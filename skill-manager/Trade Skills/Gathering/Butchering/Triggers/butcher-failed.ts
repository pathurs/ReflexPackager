import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const butcherFailed = new TriggerItem(
    'Butcher Failed',
    /^As you set about butchering the corpse, you realise you have made a mistake and mutilated it beyond redemption\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.gathering.butchering.active) {
                    gag_current_line();
                }
            }
        )
    ]
);


