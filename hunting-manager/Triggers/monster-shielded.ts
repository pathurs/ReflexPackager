import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const monsterShielded = new TriggerItem(
    'Monster Shielded',
    /^A nearly invisible magical shield forms around ([\w\W]+)\.$/,
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



