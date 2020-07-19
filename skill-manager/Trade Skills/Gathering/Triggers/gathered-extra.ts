import { ExecuteScriptAction, TriggerItem, TriggerType } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gatheredExtra = new TriggerItem(
    'Gathered Extra',
    [
        /^As you cleanse the clay in the riverwater, you discover (a group of \d+ |an |a |some |\d+ )?([\w\W]+) hidden by the silt\.$/,
        /^With your keen eyes, you spot some additional edibles and you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+) to supplement your collection\.$/
    ],
    TriggerType.MultiTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                client.skillManager.skills.trade.collecting.onCollected(args);
            }
        )
    ]
);



