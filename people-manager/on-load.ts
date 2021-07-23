import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient, GMCPService } from 'gmcp-service/gmcp-service';
import { PeopleManagerClient, PeopleManager, PeopleManagerSettings, Person, City } from './people-manager';

declare const client: PeopleManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class _PeopleManager extends client.systemService.BasePackage<PeopleManagerSettings> implements PeopleManager {
            public readonly QWCColourToCityDictionary: { [key: string]: City } = {
                '#800080': 'ashtan',
                '#008080': 'cyrene',
                '#00ff00': 'eleusis',
                '#808000': 'hashan',
                '#ff0000': 'mhaldor',
                '#ffffff': 'targossas',
                '#c0c0c0': 'cityless'
            };


            public honoursName?: string;

            public get you() {
                return this.settings.people[this.settings.name];
            }

            constructor (private readonly gmcpService: GMCPService) {
                super(
                    'People Manager',
                    'people-manager:settings',
                    {
                        enabled: true,
                        people: {},
                        name: '',
                        colourDictionary: {
                            ashtan: '#800080',
                            cyrene: '#008080',
                            eleusis: '#00ff00',
                            hashan: '#808000',
                            mhaldor: '#ff0000',
                            targossas: '#ffffff',
                            cityless: '#c0c0c0',
                            guide: '#ffff00',
                            immortal: '#008000',
                            cityenemy: '#c00000',
                            undefined: '#808080'
                        }
                    }
                );

                this.gmcpService.once(['Char.Status'], args => {
                    if (args.gmcp_args.name) {
                        this.settings.name = args.gmcp_args.name.toLowerCase();

                        this.honoursName = this.settings.name;

                        this.systemService.sendCommand(`honours ${this.settings.name}`);
                    }
                });

                this.echo('Loaded.');
            }

            public updatePerson(name: string, updates: Partial<Person>): Person {
                const lowerName = name.toLowerCase();

                const person = this.getOrCreatePerson(lowerName);

                this.systemService.mergeDeep(person, updates, { name: lowerName, lastUpdated: Date.now() });

                this.settings.people[lowerName] = person;

                this.save();

                return person;
            }

            public getPerson(name: string): Person | undefined {
                const lowerName = name.toLowerCase();

                return this.settings.people[lowerName];
            }

            public getOrCreatePerson(name: string): Person {
                const lowerName = name.toLowerCase();

                return this.systemService.copyDeep(this.getPerson(name) || { name: lowerName, lastUpdated: Date.now() });
            }

            public getColour(person: Person): string {
                let colour: string | undefined = undefined;

                if (person.name === 'romeo' || person.name === 'juliet') {
                    colour = this.settings.colourDictionary['guide'];
                }
                else if (person.race === 'immortal') {
                    colour = this.settings.colourDictionary['immortal'];
                }
                else if (person.city) {
                    colour = this.settings.colourDictionary[`${person.city}`];
                }

                return colour || this.settings.colourDictionary['undefined'];
            }

            public getEnemyColour(person: Person): string {
                const you = this.you;

                let colour: string | undefined = undefined;

                if (you && you.city && person.enemyOf && person.enemyOf.some(enemyOf => enemyOf === (<Person>you).city)) {
                    colour = this.settings.colourDictionary['cityenemy'];
                }

                return colour || this.settings.colourDictionary['undefined'];
            }

            public setEnemyOf(person: Person, entity: string): Person {
                person.enemyOf = person.enemyOf ? person.enemyOf.concat([entity]) : [entity];

                return person;
            }

            public removeEnemyOf(person: Person, entity: string): Person {
                if (person.enemyOf) {
                    const index = person.enemyOf.indexOf(entity);

                    if (index !== -1) {
                        person.enemyOf.splice(index, 1);
                    }

                    if (person.enemyOf.length === 0) {
                        delete person.enemyOf;
                    }
                }

                return person;
            }

            public isEnemyOf(person: Person, entity: string): boolean {
                return person.enemyOf ? person.enemyOf.includes(entity) : false;
            }

            public isCityEnemy(person: Person): boolean {
                return this.you?.city ? this.isEnemyOf(person, this.you.city) : false;
            }

            public isEnemy(person: Person): boolean {
                return this.isCityEnemy(person);
            }

            public displayify(name: string): string {
                const lowerName = name.toLowerCase();
                const displayified = lowerName[0].toUpperCase() + lowerName.slice(1);

                return displayified;
            }

            public getDisplayName(person: Person): string {
                const name = this.displayify(person.name);
                const colour = this.getColour(person);
                const tag = client.peopleManager.getTag(person);
                const colouredName = `%${colour}%${name}%end%`;

                let result = colouredName;

                if (this.isEnemy(person)) {
                    const enemyColour = this.getEnemyColour(person);

                    result = `%${enemyColour}%[${result}]%end%`
                }

                result = `${this.displayService.commandify(result, `HONOURS ${name}`, `${name}${tag}`)}`;

                return result;
            }

            public getTag(person: Person): string {
                let tag = '';

                if (person === this.you) {
                    tag += ` - You`;
                }

                if (person.city) {
                    tag += ` - ${this.displayify(person.city)}`;
                }

                if (person.name === 'romeo' || person.name === 'juliet') {
                    tag += ` - ${this.displayify('guide')}`;
                }

                if (person.race === 'immortal') {
                    tag += ` - ${this.displayify('immortal')}`;
                }

                if (this.isEnemy(person)) {
                    tag += ` - ${this.displayify('enemy')}`;
                }

                return tag;
            }
        }

        client.peopleManager = new _PeopleManager(client.gmcpService);
    }
);
