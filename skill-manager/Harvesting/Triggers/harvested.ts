import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const harvested = new TriggerItem(
    'Harvested',
    [
        /^You reach out and carefully harvest (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillmanager.harvesting.running) {
                    client.skillmanager.inrift(args);
                    client.skillmanager.runQueue();
                }
            }
        )
    ]
);



