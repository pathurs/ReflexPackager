import { BasePackage } from 'system-service/system-service';

type Gender = 'male' | 'female';

type Race =
    | `tsol'aa`
    | 'dwarf'
    | 'human'
    | 'troll'
    | 'mhun'
    | 'atavian'
    | 'rajamala'
    | 'horkval'
    | 'grook'
    | 'xoran'
    | 'siren'
    | 'satyr'
    | `tash'la`
    | 'immortal'
    ;

type UnknownBirth =
    | 'hidden'
    | 'old'
    | 'immortal'
    ;


type Month =
    | 'sarapin'
    | 'daedalan'
    | 'aeguary'
    | 'miraman'
    | 'scarlatan'
    | 'ero'
    | 'valnuary'
    | 'lupar'
    | 'phaestian'
    | 'chronos'
    | 'glacian'
    | 'mayan'
    ;

type Mark =
    | 'ivory'
    | 'quisalis'
    ;

type City =
    | 'ashtan'
    | 'cyrene'
    | 'eleusis'
    | 'hashan'
    | 'mhaldor'
    | 'targossas'
    | 'cityless';

interface Person {
    name: string;
    lastUpdated: number;
    honoursed?: boolean;
    lastHonoursed?: number;
    lastSeen?: number;
    fullName?: string;
    race?: Race;
    gender?: Gender;
    age?: number | UnknownBirth;
    birthday?: number | UnknownBirth;
    birthmonth?: Month | UnknownBirth;
    birthyear?: number | UnknownBirth;
    xpRank?: number;
    combatRank?: number;
    combatRating?: number;
    infamous?: boolean;
    mark?: Mark;
    city?: City;
    cityRank?: string;
    cityArmy?: boolean;
    cityArmyRank?: string;
    mightPercent?: number;
    house?: string;
    houseRank?: string;
    coatOfArms?: string;
    divorces?: number;
    motto?: string;
    warcry?: string;
    deeds?: number;
    enemyOf?: string[];
}

interface People {
    [name: string]: Person | undefined;
}

interface PeopleManagerSettings {
    enabled: boolean;
    people: People;
    name: string;
    colourDictionary: { [key: string]: string };
}

interface PeopleManager extends BasePackage<PeopleManagerSettings> {
    settings: PeopleManagerSettings;
    honoursName?: string;
    honoursTimerId?: number;
    QWCColourToCityDictionary: { [key: string]: City };
    readonly you: Person | undefined;
    updatePerson(name: string, updates: Partial<Person>): Person;
    getPerson(name: string): Person | undefined;
    getOrCreatePerson(name: string): Person;
    getColour(person: Person): string;
    getEnemyColour(person: Person): string;
    setEnemyOf(person: Person, entity: string): Person;
    removeEnemyOf(person: Person, entity: string): Person;
    isEnemyOf(person: Person, entity: string): boolean;
    isCityEnemy(person: Person): boolean;
    isEnemy(person: Person): boolean;
    displayify(name: string): string;
    getDisplayName(person: Person): string;
    getTag(person: Person): string;
}

export type PeopleManagerClient = typeof client & {
    peopleManager: PeopleManager;
};
