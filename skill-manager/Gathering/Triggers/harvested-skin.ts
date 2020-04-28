import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient;

export const harvestedSkin = new TriggerItem(
    'Harvested Skin',
    [
        /^You reach down and carefully peel off two long strips of skin from the dead sidewinder\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                client.skillmanager.inrift([args[0], '2', 'sidewinder skins']);
                client.skillmanager.runQueue();
            }
        )
    ]
);
