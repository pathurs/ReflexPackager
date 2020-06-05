import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { AfflictionManagerClient } from 'affliction-manager/affliction-manager';

declare const client: AfflictionManagerClient;

export const prone = new TriggerItem(
    'Prone',
    /^You must be standing first\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.afflictionManager.predict('prone');
            }
        )
    ]
);
