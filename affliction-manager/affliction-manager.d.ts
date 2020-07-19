import { BasePackage } from 'system-service/system-service';

type AfflictionManagerAfflictions =
    | 'prone'
    ;

interface AfflictionManagerSettings {
    enabled: boolean;
}

interface AfflictionManager extends BasePackage<AfflictionManagerSettings> {
    predict(affliction: AfflictionManagerAfflictions): void;
    unpredict(affliction: AfflictionManagerAfflictions): void;
    unpredictAll(): void;
}

export type AfflictionManagerClient = typeof client & {
    afflictionManager: AfflictionManager;
};
