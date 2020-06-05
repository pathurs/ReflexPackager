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
                let card = <keyof SkillManagerTarotInscribingQueue>client.skillManager.tarot.descriptionDictionary[args[1]];

                client.systemService.sendCommand(`ind ${card}`);

                if (client.skillManager.tarot.inscribing.active) {
                    gag_current_line();

                    client.skillManager.echo('%lime%Inscribing Successful!');

                    client.skillManager.tarot.inscribing.queue[card] = Math.max(client.skillManager.tarot.inscribing.queue[card] - 1, 0);

                    client.skillManager.tarot.inscribing.runningQueue = false;

                    client.skillManager.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);



