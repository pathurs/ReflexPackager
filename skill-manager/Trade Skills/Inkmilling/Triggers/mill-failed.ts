import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const millFailed = new TriggerItem(
    'Mill Failed',
    /^Lacking the rattle of a successful milling, you realise that you've done something wrong and spoiled the batch, which you empty onto the ground in disgust\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                if (client.skillManager.inkmilling.active) {
                    client.skillManager.echo('Inkmilling failed!');

                    client.skillManager.inkmilling.runningQueue = false;

                    client.skillManager.inkmilling.runQueue();
                }
            }
        )
    ]
);



