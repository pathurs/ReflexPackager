import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const harvestedSac = new TriggerItem(
    'Harvested Sac',
    [
        /^You reach down and expertly pry back the jaws of the dead snake\. Reaching in with your fingers, careful to avoid the sharp fangs, you tear out the two venom sacs\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                client.skillmanager.inrift([args[0], '2', 'venom sacs']);
                client.skillmanager.runQueue();
            }
        )
    ]
);
