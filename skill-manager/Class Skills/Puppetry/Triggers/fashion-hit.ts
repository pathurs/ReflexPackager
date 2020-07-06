import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new MultiTriggerItem(
    'CHANGEME',
    [
        /^While you hastily examine ([A-Z][a-z]+), you mould the fledgling puppet a bit, further defining the arms and legs\.$/, // 0-9
        /^Adding further detail to the puppet of ([A-Z][a-z]+), you work on defining the nose, ears, eyes, and mouth\.$/, // 10-19
        /^You examine the puppet carefully, and begin to form fingers and toes\.$/, // 20-29
        /^You fashion the eyes of your puppet to resemble those of ([A-Z][a-z]+)\.$/, // 30-39
        /^With one hand pointed towards ([A-Z][a-z]+), you rub your finger over the heart of your puppet\.$/, // 40-49
        /^You laugh darkly and squint at ([A-Z][a-z]+) as you add some final touches to your puppet of (?:him|her)\.$/ // 50-102
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.puppetry.active) {
                    client.skillManager.onAbility('puppetry', 'CHANGEME', 'CHANGEME', args);
                }
            }
        )
    ]
);
