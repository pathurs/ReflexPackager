import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gallowshumourHit = new TriggerItem(
    'Gallowshumour Hit',
    /^A nearly perfect puppet of ([A-Z][a-z]+) trembles under your fingers as you coax out some character from that oh so stoic greyface ([A-Z][a-z]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('pranks', 'gallowshumour', 'hit', args);
                }
            }
        )
    ]
);
