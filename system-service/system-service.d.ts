
interface SystemService {
    enabled: boolean;
    lastSavedAt: number;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    save(id: string, callback: () => void): void;
    sendCommand(command: string, echo?: boolean): void;
}

export type SystemServiceClient = typeof client & {
    systemservice: SystemService;
};
