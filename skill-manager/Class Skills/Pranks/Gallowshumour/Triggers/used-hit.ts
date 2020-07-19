import { TriggerType, ExecuteScriptAction, TriggerItem } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const usedHit = new TriggerItem(
    'Used Hit',
    [
        /^With a sinister grin, you begin a relentless onslaught of the blackest humour your genius can come up with, bombarding the tragically stoic ([A-Z][a-z]+) with your magnificent wit\.$/,
        /^A nearly perfect puppet of ([A-Z][a-z]+) trembles under your fingers as you coax out some character from that oh so stoic greyface ([A-Z][a-z]+)\.$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'gallowshumour', 'gallowshumour', ['used', 'hit'], args);
                }
            }
        )
    ]
);
