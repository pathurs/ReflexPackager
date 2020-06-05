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
                if (client.huntingManager.settings.enabled && client.huntingManager.active) {
                    if (client.huntingManager.target.currentTarget && client.huntingManager.target.currentTarget.name === args[1]) {
                        client.huntingManager.raze.tryRazeTarget();
                    }
                }
            }
        )
    ]
);



