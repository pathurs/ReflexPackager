import { TriggerItem, ExecuteScriptAction, TriggerType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient } from 'people-manager/people-manager';

declare const client: PeopleManagerClient & SystemServiceClient;

export const cityWho = new TriggerItem(
    'City Who',
    [
        /^Citizen                                                   Rank CT  Class$/,
        /^-------                                                   ---- --  -----$/,
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: MultiLineTriggerFunctionArgs) {
                const nameRegExp = /\u001b\[38;5;006m([A-Z][a-z]+)\u001b\[38;5;007m/;

                for (const line of args.block) {
                    if ('parsed_line' in line) {
                        const name: string | undefined = (line.line.match(nameRegExp) || [])[1];

                        if (name) {
                            const person = client.peopleManager.getOrCreatePerson(name);

                            person.lastSeen = Date.now();

                            if (client.peopleManager.you?.city) {
                                person.city = client.peopleManager.you.city;
                            }

                            client.peopleManager.updatePerson(person.name, person);
                        }
                    }
                }
            }
        )
    ]
);
