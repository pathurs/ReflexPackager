import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient, PeopleManager, PeopleManagerSettings, Person, City } from './people-manager';

declare const client: PeopleManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class _PeopleManager extends client.systemService.BasePackage<PeopleManagerSettings> implements PeopleManager {
            public readonly QWCColourToCityDictionary: { [key: string]: City } = {
                '#800080': 'Ashtan',
                '#008080': 'Cyrene',
                '#00ff00': 'Eleusis',
                '#808000': 'Hashan',
                '#ff0000': 'Mhaldor',
                '#ffffff': 'Targossas',
                '#c0c0c0': 'Cityless'
            };

            public get me() {
                return this.settings.people[this.name];
            }

            constructor () {
                super(
                    'People Manager',
                    'people-manager:settings',
                    {
                        enabled: true,
                        people: {},
                        name: '',
                        colourDictionary: {
                            'Ashtan': '#800080',
                            'Cyrene': '#008080',
                            'Eleusis': '#00ff00',
                            'Hashan': '#808000',
                            'Mhaldor': '#ff0000',
                            'Targossas': '#ffffff',
                            'Cityless': '#c0c0c0'
                        }
                    }
                );

                this.echo('Loaded.');
            }

            public updatePerson(name: string, updates: Partial<Person>): Person {
                const person = this.getPerson(name) || { name };

                this.systemService.mergeDeep(person, updates);

                this.settings.people[name] = person;

                this.save();

                return person;
            }

            public getPerson(name: string): Person | undefined {
                return client.peopleManager.settings.people[name];
            }

            public getColour(name: string): string {
                const person = this.getPerson(name);

                if (person) {
                    if (person.city) {
                        return this.settings.colourDictionary[person.city];
                    }
                }

                return '';
            }
        }

        client.peopleManager = new _PeopleManager();
    }
);
