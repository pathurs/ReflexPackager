import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const CHANGEME = new MultiTriggerItem(
    'CHANGEME',
    [
        /^A puppet roughly resembling ([A-Z][a-z]+) has lost some of its definition\.$/, // 1-19
        /^A puppet of ([A-Z][a-z]+) has lost some of its definition\.$/, // 20-39
        /^A nearly perfect puppet of of ([A-Z][a-z]+) has lost some of its definition\.$/, // 40-49
        /^A living puppet of ([A-Z][a-z]+) has lost some of its definition\.$/ // 50-102
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
