import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gathered = new MultiTriggerItem(
    'Gathered',
    [
        /^You reach out and carefully harvest (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^Sifting through the soft riverbed with your fingers, you collect (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^Carefully scouring the nooks and crannies of the surrounding rock, you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^You scour the farmland and find a rudimentary nest, from which you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
        /^Using your acute sight, you examine the surrounding sea\. You spot a sparkling patch of pure saltwater, free of impurities, and catch it in a tourmaline vial\.$/
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                client.skillManager.skills.trade.collecting.onCollected(args);
            }
        )
    ]
);



