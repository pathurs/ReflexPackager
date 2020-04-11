interface HuntingManager {
    enabled: boolean;
    currentTargetId?: string;
    potentialTargets: string[];
}

export type HuntingManagerClient = typeof client & {
    huntingmanager: HuntingManager;
};
