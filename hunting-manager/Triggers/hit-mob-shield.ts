
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
                if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
                    if (client.huntingmanager.target.currentTarget && client.huntingmanager.target.currentTarget.name === args[1]) {
                        client.huntingmanager.raze.tryRazeTarget();
                    }
                }
            }
        )
    ]
);



