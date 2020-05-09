import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const notProne = new TriggerItem(
    'Not Prone',
    /^You are not fallen or kneeling\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
                    gag_current_line();
                }
            }
        )
    ]
);



