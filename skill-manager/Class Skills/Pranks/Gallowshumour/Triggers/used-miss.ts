import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedMiss = new TriggerItem(
    'Used Miss',
    [
        /^With a sinister grin, you begin a relentless onslaught of the blackest humour your genius can come up with, bombarding the tragically stoic ([A-Z][a-z]+) with your magnificent wit\.$/,
        /^Not even your brilliant display can crack the stoic greyface ([A-Z][a-z]+). A tough customer!/,
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'gallowshumour', 'gallowshumour', ['used', 'miss'], args);
                }
            }
        )
    ]
);
