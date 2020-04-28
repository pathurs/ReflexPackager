
import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const hitMonsterShield = new TriggerItem(
    'Hit Monster Shield',
    /^A dizzying beam of energy strikes you as your attack rebounds off of ([\w\W]+)'s shield\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.huntingmanager.running && client.huntingmanager.currentTarget && client.huntingmanager.currentTarget.name === args[1]) {
                    client.huntingmanager.tryRaze();
                }
            }
        )
    ]
);



