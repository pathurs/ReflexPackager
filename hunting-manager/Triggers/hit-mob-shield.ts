
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const hitMobShield = new TriggerItem(
    'Hit Mob Shield',
    /^A dizzying beam of energy strikes you as your attack rebounds off of ([\w\W]+)'s shield\.$/,
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



