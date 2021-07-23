import { TriggerItem, ExecuteScriptAction, TriggerType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient, Person, City } from 'people-manager/people-manager';
import { DisplayServiceClient } from 'display-service/display-service';

declare const client: PeopleManagerClient & SystemServiceClient & DisplayServiceClient;

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

                if ('parsed_line' in peopleLine) {
                    if (peopleLine.line !== 'None') {
                        const regExp = /\u001b\[4z<COLOR (#[A-Za-z0-9]+)>\u001b\[4z(?:<SEND HREF="HONOURS [A-Za-z]+">)?([A-Za-z]+)\u001b\[4z(?:<\/SEND>)?\u001b\[4z<\/COLOR>(?:, | and |\.)?/g;
                        const people: Person[] = [];
                        let isQWC = false;

                        let match: RegExpMatchArray | null = null;

                        while (match = regExp.exec(peopleLine.line)) {
                            const name: string | undefined = match[2];

                            if (!name) {
                                continue;
                            }

                            const person = client.peopleManager.getOrCreatePerson(name);

                            person.lastSeen = Date.now();

                            const cityName = match[1] in client.peopleManager.QWCColourToCityDictionary
                                ? client.peopleManager.QWCColourToCityDictionary[<keyof typeof client.peopleManager.QWCColourToCityDictionary>match[1]]
                                : undefined;

                            if (cityName) {
                                if (cityName !== 'cityless') {
                                    isQWC = true;
                                }

                                person.city = cityName;

                                people.push(person);
                            }
                        }

                        const cityDictionary: { [K in City | 'unknown']: Person[] } = {
                            ashtan: [],
                            cityless: [],
                            cyrene: [],
                            eleusis: [],
                            hashan: [],
                            mhaldor: [],
                            targossas: [],
                            unknown: []
                        };

                        people.forEach(person => {
                            if (!isQWC) {
                                delete person.city;
                            }

                            const updatedPerson = client.peopleManager.updatePerson(person.name, person);

                            cityDictionary[updatedPerson.city ?? 'unknown'].push(updatedPerson);
                        });

                        const lines: string[] = [];

                        lines.push(`%lightgray%Quick Who${isQWC ? ` (${client.displayService.rainbowify('Coloured')})` : ''}`);
                        lines.push('');

                        let tabSize = 0;

                        for (const cityName in cityDictionary) {
                            tabSize = Math.max(tabSize, cityName.length);
                        }

                        for (const cityName in cityDictionary) {
                            const citizens = cityDictionary[<City | 'unknown'>cityName];
                            const colouredCityName = `%${client.peopleManager.settings.colourDictionary[cityName]}%${client.peopleManager.displayify(cityName)}%end%`;
                            const tab = `${' '.repeat(tabSize - cityName.length)}`;
                            const colouredCitizens = citizens.map(person => client.peopleManager.getDisplayName(person)).join(', ');
                            const count = citizens.length;

                            lines.push(`${colouredCityName}:${tab} ${colouredCitizens}${count > 0 ? ' ' : ''}(${count})`);
                        }

                        lines.push('');
                        lines.push(`%lightgray%Total:${' '.repeat(tabSize - 5)} ${people.length}`);

                        client.displayService.echo(lines);

                        args.lines.forEach(line => {
                            if ('parsed_line' in line) {
                                line.gag = true;
                            }
                        });
                    }
                }
            }
        )
    ]
);
