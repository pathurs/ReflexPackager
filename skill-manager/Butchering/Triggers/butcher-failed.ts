import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const butcherFailed = new TriggerItem(
    'Butcher Failed',
    /^As you set about butchering the corpse, you realise you have made a mistake and mutilated it beyond redemption\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillmanager.butchering.running) {
                    client.skillmanager.butchering.queue.push('butcher corpse for reagent');

                    client.skillmanager.runQueue();
                }
            }
        )
    ]
);



