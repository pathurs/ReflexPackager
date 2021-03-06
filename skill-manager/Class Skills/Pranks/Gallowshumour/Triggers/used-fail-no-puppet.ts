import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedFailNoPuppet = new TriggerItem(
    'Used Fail No Puppet',
    /^You are not wielding a puppet of ([A-Z][a-z]+): why waste your magnificent wit on such a droll audience\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'gallowshumour', 'gallowshumour', ['used', 'fail', 'no puppet'], args);
                }
            }
        )
    ]
);
