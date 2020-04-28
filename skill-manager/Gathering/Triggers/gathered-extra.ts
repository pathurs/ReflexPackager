import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const gatheredExtra = new TriggerItem(
    'Gathered Extra',
    [
        /^As you cleanse the clay in the riverwater, you discover (a group of \d+ |an |a |some |\d+ )?([\w\W]+) hidden by the silt\.$/,
        /^With your keen eyes, you spot some additional edibles and you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+) to supplement your collection\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                client.skillmanager.inrift(args);
            }
        )
    ]
);



