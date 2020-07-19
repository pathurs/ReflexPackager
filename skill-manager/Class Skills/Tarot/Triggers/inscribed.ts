import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient, SkillManagerTarotInscribingQueue, } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const inscribed = new TriggerItem(
    'Inscribed',
    /^You have successfully inscribed the image of (?:the )?([\w\W]+) on your Tarot card\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.tarot.active) {
                    client.skillManager.onAbility('tarot', 'CHANGEME', 'CHANGEME', 'CHANGEME', args);
                }

                let card = <keyof SkillManagerTarotInscribingQueue>client.skillManager.skills.class.tarot.descriptionDictionary[args[1]];

                client.systemService.sendCommand(`ind ${client.skillManager.skills.class.tarot.inscribing.amount} ${card}`);

                if (client.skillManager.skills.class.tarot.inscribing.active) {
                    gag_current_line();

                    client.skillManager.echo('%lime%Inscribing Successful!');

                    client.skillManager.skills.class.tarot.inscribing.queue[card] = Math.max(client.skillManager.skills.class.tarot.inscribing.queue[card] - client.skillManager.skills.class.tarot.inscribing.amount, 0);

                    client.skillManager.skills.class.tarot.inscribing.runningQueue = false;

                    client.skillManager.skills.class.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);
