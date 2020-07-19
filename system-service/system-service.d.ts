import { DisplayService } from 'display-service/display-service'

export class BasePackage<TSettings extends object = object> {
    public readonly name: string;
    public readonly settingsId: string;
    public readonly settings: TSettings;

    protected readonly displayService: DisplayService;
    protected readonly systemService: SystemService;

    public constructor (
        name: string,
        settingsId: string,
        settings: object,
        displayService: DisplayService,
        systemService: SystemService
    );

    public echo(message: string): void;
    public error(message: string): void;
    public save(): void;
}

type BasePackageConstructor = new <TSettings extends object = object>(
    name: string,
    settingsId: string,
    settings: TSettings
) => BasePackage<TSettings>;

interface SystemService {
    lastSavedAt: number;
    BasePackage: BasePackageConstructor;
    echo(text: string): void;
    error(text: string): void;
    save(id: string, callback: () => void): void;
    mergeDeep<T extends object>(target: T, ...sources: T[]): T;
    defaultsDeep<T extends object>(target: T | undefined, ...sources: T[]): T;
    sendCommand(command: string, echo?: boolean): void;
    sendCommands(commands: string[], echo?: boolean): void;
}

export type SystemServiceClient = typeof client & {
    systemService: SystemService;
};
