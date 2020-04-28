import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient, TarotCard, TarotCardPhraseToNameMap, } from '../../skill-manager';

declare const client: SkillManagerClient;

export const inscribed = new TriggerItem(
    'Inscribed',
    [
        /^You have successfully inscribed the image of (?:the )?([\w\W]+) on your Tarot card\.$/
    ],
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                let card = <Exclude<TarotCard, 'blank'>>client.skillmanager.tarot.phraseToNameMap[<keyof TarotCardPhraseToNameMap>args[1]];

                send_command(`ind ${card}`, 1);

                if (client.skillmanager.tarot.inscribing.running) {
                    gag_current_line();

                    client.skillmanager.echo('%lime%Inscribing Successful!');

                    client.skillmanager.tarot.inscribing.queue[card] = Math.max(client.skillmanager.tarot.inscribing.queue[card] - 1, 0);

                    client.skillmanager.tarot.inscribing.runQueue();
                }
            }
        )
    ]
);



