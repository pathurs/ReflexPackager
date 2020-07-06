interface CombatManager {
    echo(text: string): void;
    error(text: string): void;
    save(): void;
}

export type CombatManagerClient = typeof client & {
    combatManager: CombatManager;
};
