import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
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
                let card = <keyof SkillManagerTarotInscribingQueue>client.skillmanager.tarot.descriptionDictionary[args[1]];

                client.systemservice.sendCommand(`ind ${card}`);

                if (client.skillmanager.tarot.inscribing.active) {
                    gag_current_line();

                    client.skillmanager.echo('%lime%Inscribing Successful!');

                    client.skillmanager.tarot.inscribing.queue[card] = Math.max(client.skillmanager.tarot.inscribing.queue[card] - 1, 0);

                    client.skillmanager.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);



