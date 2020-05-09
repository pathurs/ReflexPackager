import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const mobShielded = new TriggerItem(
    'Mob Shielded',
    /^A nearly invisible magical shield forms around ([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
                    if (client.huntingmanager.target.currentTarget && client.huntingmanager.target.currentTarget.name === args[1]) {
                        client.huntingmanager.raze.tryRazeTarget();
                    }
                }
            }
        )
    ]
);



