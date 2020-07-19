import { TriggerItem, ExecuteScriptAction, TriggerType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient, Person } from 'people-manager/people-manager';

declare const client: PeopleManagerClient & SystemServiceClient;

export const quickWho = new TriggerItem(
    'Quick Who',
    [
        /^([\w\W]+)$/,
        /^(?:Plus another (\d+) whose presence you cannot fully sense)? ?(?:\(\d+ total\))?\.$/,
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: MultiLineTriggerFunctionArgs) {
                const peopleLine = args.lines[0];
                const changedPeople: (Partial<Person> & { name: string })[] = [];

                if ('line' in peopleLine) {
                    if (peopleLine.line !== 'None') {
                        const regExp = /\u001b\[4z<COLOR (#[A-Za-z0-9]+)>\u001b\[4z(?:<SEND HREF="HONOURS [A-Z]+">)?([A-Z][a-z]+)\u001b\[4z(?:<\/SEND>)?\u001b\[4z<\/COLOR>(?:, | and |\.)?/g;

                        let match: RegExpMatchArray | null = null;

                        while (match = regExp.exec(peopleLine.line)) {
                            const name = match[2];
                            const city = match[1] in client.peopleManager.QWCColourToCityDictionary
                                ? client.peopleManager.QWCColourToCityDictionary[<keyof typeof client.peopleManager.QWCColourToCityDictionary>match[1]]
                                : undefined;

                            const person = client.peopleManager.settings.people[name];

                            if (!person || person.city !== city) {
                                changedPeople.push({ name, city });
                            }
                        }

                        if (changedPeople.some(person => person.city !== undefined && person.city !== 'Cityless')) {
                            changedPeople.forEach(person => {
                                client.peopleManager.updatePerson(person.name, person);
                            });
                        }
                    }
                }
            }
        )
    ]
);



