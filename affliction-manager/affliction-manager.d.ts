type AfflictionManagerAfflictions =
    | 'prone'
    ;

interface AfflictionManagerSettings {
    enabled: boolean;
}

interface AfflictionManager {
    settings: AfflictionManagerSettings;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    predict(affliction: AfflictionManagerAfflictions): void;
    unpredict(affliction: AfflictionManagerAfflictions): void;
    unpredictAll(): void;
}

export type AfflictionManagerClient = typeof client & {
    afflictionManager: AfflictionManager;
};
