import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const leftParty = new TriggerItem(
    'Left Party',
    /^You have left your party\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.huntingmanager.settings.enabled) {
                    client.huntingmanager.target.setTargetCaller('none');
                }
            }
        )
    ]
);



