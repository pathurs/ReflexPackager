import { TriggerItem, ExecuteScriptAction, TriggerType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient, Person } from 'people-manager/people-manager';

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
                const changedPeople: (Partial<Person> & { name: string })[] = [];
                const nameRegExp = /\u001b\[38;5;006m([A-Z][a-z]+)\u001b\[38;5;007m/;

                for (const line of args.block) {
                    if ('parsed_line' in line) {
                        const name = (line.line.match(nameRegExp) || [])[1];
                        const person = client.peopleManager.settings.people[name];

                        if (name) {
                            if (!person) {
                                changedPeople.push({ name });
                            }
                        }
                    }
                }

                if (changedPeople.some(person => person.city !== undefined && person.city !== 'Cityless')) {
                    changedPeople.forEach(person => {
                        client.peopleManager.updatePerson(person.name, person);
                    });
                }
            }
        )
    ]
);



