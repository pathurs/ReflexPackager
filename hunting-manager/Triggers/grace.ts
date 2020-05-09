import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const grace = new TriggerItem(
    'Grace',
    /^You currently walk in Divine Grace and may neither be harmed nor harm another\. To leave this state of protection, you must RENOUNCE GRACE\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
                    client.huntingmanager.error(`Cannot hunt while graced.`);

                    client.huntingmanager.stop();
                }
            }
        )
    ]
);



