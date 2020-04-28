import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const gatheredMilk = new TriggerItem(
    'Gathered Milk',
    /^Spotting a cow whose udder hangs low to the ground, you kneel beside her, gently coaxing her milk into [\w\W]+\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillmanager.gathering.running) {
                    client.skillmanager.inrift([args[0], undefined, 'sips of milk']);
                    client.skillmanager.runQueue();
                }
            }
        )
    ]
);



