interface PeopleManagerSettings {
    enabled: boolean;
}

interface PeopleManager {
    settings: PeopleManagerSettings;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
}

export type PeopleManagerClient = typeof client & {
    peopleManager: PeopleManager;
};
