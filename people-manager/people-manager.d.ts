import { BasePackage } from 'system-service/system-service';

type City =
    | 'Ashtan'
    | 'Cyrene'
    | 'Eleusis'
    | 'Hashan'
    | 'Mhaldor'
    | 'Targossas'
    | 'Cityless';

interface Person {
    name: string;
    city?: City;
}

interface People {
    [name: string]: Person | undefined;
}

interface PeopleManagerSettings {
    enabled: boolean;
    people: People;
    name: string;
    colourDictionary: {
        Ashtan: string;
        Cyrene: string;
        Eleusis: string;
        Hashan: string;
        Mhaldor: string;
        Targossas: string;
        Cityless: string;
    };
}

interface PeopleManager extends BasePackage<PeopleManagerSettings> {
    settings: PeopleManagerSettings;
    QWCColourToCityDictionary: { [key: string]: City };
    readonly me: Person | undefined;
    updatePerson(name: string, updates: Partial<Person>): Person;
    getPerson(name: string): Person | undefined;
    getColour(name: string): string;
}

export type PeopleManagerClient = typeof client & {
    peopleManager: PeopleManager;
};
