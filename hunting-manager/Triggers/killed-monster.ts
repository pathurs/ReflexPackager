import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const killedMonster = new TriggerItem(
    'Killed Monster',
    /^You have slain ([\w\W]+), retrieving the corpse\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                client.huntingmanager.addMonster(client.huntingmanager.room.area, args[1]);
            }
        )
    ]
);



