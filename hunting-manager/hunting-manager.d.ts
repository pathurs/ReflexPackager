import { QueueSubscription } from '../queue-service/queue-service';

interface Area {
    name: string;
    monsters: string[];
}

interface Areas {
    [name: string]: Area;
}

interface Settings {
    enabled: boolean;
    warnAtPercent: number;
    fleeAtPercent: number;
    autoFlee: boolean;
    attackCommand: string;
    razeCommand?: string;
    shieldCommand?: string;
}

interface HuntingManager {
    running: boolean;
    settings: Settings;
    room: GMCPRoomInfo;
    areas: Areas;
    roomMonsters: GMCPCharItemsItem[];
    currentTarget?: GMCPCharItemsItem;
    queueSubscription?: QueueSubscription<'bal' | 'eq' | 'eqbal'>;
    echo(message: string): void;
    error(text: string): void;
    addArea(area: string): void;
    save(): void;
    addMonster(area: string, monster: string): void;
    onRoomChange(args: GMCPFunctionArgs<'Char.Items.List' | 'Char.Items.Add' | 'Char.Items.Remove' | 'Char.Items.Update'>): void;
    start(): void;
    stop(): void;
    findTarget(): GMCPCharItemsItem | undefined;
    target(target: GMCPCharItemsItem | undefined): void;
    tryTargetNext(): void;
    attack(): void;
    tryAttack(): void;
    raze(): void;
    tryRaze(): void;
    shield(): void;
    tryShield(): void;
}

export type HuntingManagerClient = typeof client & {
    huntingmanager: HuntingManager;
};
