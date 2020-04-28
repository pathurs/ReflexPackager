import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const butchered = new TriggerItem(
    'Butchered',
    /^Skilfully, you butcher the corpse of [\w\W]+, separating flesh from bone with your cleaver and preparing (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillmanager.butchering.running) {
                    client.skillmanager.inrift(args);

                    client.skillmanager.butchering.queue.push('butcher corpse for reagent');

                    client.skillmanager.runQueue();
                }
            }
        )
    ]
);



