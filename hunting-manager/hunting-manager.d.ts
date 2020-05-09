import { QueueSubscription } from 'queue-service/queue-service';

interface Area {
    name: string;
    mobs: string[];
}

interface Areas {
    [name: string]: Area;
}

interface Settings {
    enabled: boolean;
    areas: Areas;

    attackCommand: string;

    razeCommand?: string;

    warnAtPercent: number;

    shieldCommand?: string;
    shieldAtPercent: number;
    autoShield: boolean;

    fleeAtPercent: number;
    autoFlee: boolean;
}

interface HuntingManagerTarget {
    currentTarget?: GMCPCharItemsItem;
    setTarget(target: GMCPCharItemsItem | undefined): void;
    findPriorityTarget(): GMCPCharItemsItem | undefined;
    tryTargetPriority(): void;
}

interface HuntingManagerAttack {
    setAttackCommand(command: string): void;
    attackTarget(): void;
    tryAttackTarget(): void;
}

interface HuntingManagerRaze {
    setRazeCommand(command: string): void;
    razeTarget(): void;
    tryRazeTarget(): void;
}

interface HuntingManagerWarn {
    setWarnAtPercent(percent: number): void;
}

interface HuntingManagerShield {
    setShieldCommand(command: string): void;
    setShieldAtPercent(percent: number): void;
    shield(): void;
    tryShield(): void;
}

interface HuntingManagerFlee {
    setFleeAtPercent(percent: number): void;
    flee(): void;
    tryFlee(): void;
}

interface HuntingManager {
    active: boolean;
    settings: Settings;
    target: HuntingManagerTarget;
    attack: HuntingManagerAttack;
    raze: HuntingManagerRaze;
    warn: HuntingManagerWarn;
    shield: HuntingManagerShield;
    flee: HuntingManagerFlee;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    addArea(area: string): void;
    addMob(area: string, mob: string): void;
    start(): void;
    stop(): void;
}

export type HuntingManagerClient = typeof client & {
    huntingmanager: HuntingManager;
};
