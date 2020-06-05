
interface SystemService {
    enabled: boolean;
    lastSavedAt: number;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    save(id: string, callback: () => void): void;
    mergeDeep<T extends object>(target: T, ...sources: T[]): T;
    defaultsDeep<T extends object>(target: T | undefined, ...sources: T[]): T;
    sendCommand(command: string, echo?: boolean): void;
    sendCommands(commands: string[], echo?: boolean): void;
}

export type SystemServiceClient = typeof client & {
    systemService: SystemService;
};
