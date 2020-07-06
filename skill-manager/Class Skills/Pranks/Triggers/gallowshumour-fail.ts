import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gallowshumourFail = new TriggerItem(
    'Gallowshumour Fail',
    /^Not even your brilliant display can crack the stoic greyface ([A-Z][a-z]+). A tough customer!/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'gallowshumour', 'fail', args);
                }
            }
        )
    ]
);
