import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const targetCalled = new TriggerItem(
    'Target Called',
    /^\(Party\): (\w+) says, "Target:? (\d+)\."$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string; 2: string }) {
                if (client.huntingManager.settings.enabled) {
                    const person = args[1].toLowerCase();

                    if (client.huntingManager.target.targetCallerName === person) {
                        const targetId = Number(args[2]);

                        client.huntingManager.target.setTarget(targetId);
                    }
                }
            }
        )
    ]
);



