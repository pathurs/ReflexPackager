type DescriptionDictionary = { [key: string]: string | undefined };
type EnvironmentDictionary = { [key: string]: string[] | undefined };

//#region Pranks

type SkillManagerPranksProps = 'balloon' | 'blackjack' | 'itchpowder' | 'mickey';
type SkillManagerPranksPropAmount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type SkillManagerPranksIllusionColour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 'lethal';
type SkillManagerPranksRunAwayDistance = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface SkillManagerPranks {
    handspring(target: string): string;
    // props(): void;
    // wishForProp(prop: SkillManagerPranksProps, amount?: SkillManagerPranksPropAmount): void;
    // inflateBalloon(): void;
    // slipperiness(): void;
    // bop(target?: string | number): void;
    // inflateBalloonIntoGiraffe(): void;
    // mountGiraffe(): void;
    // stepIntoTrees(): void;
    // backflip(direction: string): void;
    // hocuspocus(illusion: string, delay: number, colour?: SkillManagerPranksIllusionColour): void;
    // runAway(direction: string, distance?: SkillManagerPranksRunAwayDistance): void;
    // balloonHandoff(target?: string): void;
    // backHandspring(target: string, direction: string): void;
}

interface SkillManagerPranksSettings {
    enabled: boolean;
}

//#endregion

//#region Tarot

interface SkillManagerTarotInscribingQueue {
    sun: number;
    emperor: number;
    magician: number;
    priestess: number;
    fool: number;
    chariot: number;
    hermit: number;
    empress: number;
    lovers: number;
    hierophant: number;
    hangedman: number;
    tower: number;
    wheel: number;
    creator: number;
    justice: number;
    star: number;
    aeon: number;
    lust: number;
    universe: number;
    devil: number;
    moon: number;
    death: number;
}

interface SkillManagerTarotInscribing {
    active: boolean;
    runningQueue: boolean;
    queue: SkillManagerTarotInscribingQueue;
    start(): void;
    stop(): void;
    reset(): void;
    runQueue(): void;
}

interface SkillManagerTarot {
    cards: string[];
    descriptionDictionary: DescriptionDictionary;
    inscribing: SkillManagerTarotInscribing;
}

interface SkillManagerTarotSettings {
    enabled: boolean;
}

//#endregion

//#region Harvesting

interface SkillManagerHarvesting {
    harvestables: string[];
    descriptionDictionary: DescriptionDictionary;
}

interface SkillManagerHarvestingSettings {
    enabled: boolean;
}

//#endregion

//#region Transmutation

interface SkillManagerTransmutation {
    extractables: string[];
    descriptionDictionary: DescriptionDictionary;
}

interface SkillManagerTransmutationSettings {
    enabled: boolean;
}

//#endregion

//#region Gathering

interface SkillManagerButchering {
    active: boolean;
    descriptionDictionary: DescriptionDictionary;
    itemToRewield?: string;
    start(): void;
    stop(): void;
    butcher(): void;
}

interface SkillManagerGathering {
    butchering: SkillManagerButchering;
    gatherables: string[];
    environmentDictionary: EnvironmentDictionary;
    descriptionDictionary: DescriptionDictionary;
    getGatherables(): string[];
}

interface SkillManagerGatheringSettings {
    enabled: boolean;
    cleaverId?: string;
}

//#endregion

//#region Collecting

interface SkillManagerCollecting {
    active: boolean;
    automatic: boolean;
    waitingForPlants: boolean;
    waitingForMinerals: boolean;
    queue: Set<string>;
    start(): void;
    stop(): void;
    clear(): void;
    collect(): void;
    tryCollect(): void;
}

interface SkillManagerCollectingSettings {
    enabled: boolean;
}

//#endregion

//#region Inkmilling

interface SkillManagerInkmillingQueue {
    red: number;
    blue: number;
    yellow: number;
    green: number;
    purple: number;
    gold: number;
    black: number;
}

interface SkillManagerInkmillingInkReagents {
    red?: number;
    blue?: number;
    yellow?: number;
    gold?: number;
    common?: number;
    uncommon?: number;
    scarce?: number;
    rare?: number;
}

interface SkillManagerInkmillingInks {
    red: SkillManagerInkmillingInkReagents;
    blue: SkillManagerInkmillingInkReagents;
    yellow: SkillManagerInkmillingInkReagents;
    green: SkillManagerInkmillingInkReagents;
    purple: SkillManagerInkmillingInkReagents;
    gold: SkillManagerInkmillingInkReagents;
    black: SkillManagerInkmillingInkReagents;
}

type ReagentDictionary = { [key: string]: string[] };

interface SkillManagerInkmilling {
    active: boolean;
    runningQueue: boolean;
    queue: SkillManagerInkmillingQueue;
    reagents: ReagentDictionary;
    inks: SkillManagerInkmillingInks;
    descriptionDictionary: DescriptionDictionary;
    mill(colour: string, amount?: number): string;
    start(): void;
    stop(): void;
    reset(): void;
    runQueue(): void;
}

interface SkillManagerInkmillingSettings {
    enabled: boolean;
    millId?: string;
}

//#endregion

interface SkillManagerSettings {
    enabled: boolean;
    pranks: SkillManagerPranksSettings;
    tarot: SkillManagerTarotSettings;
    harvesting: SkillManagerHarvestingSettings;
    transmutation: SkillManagerTransmutationSettings;
    gathering: SkillManagerGatheringSettings;
    collecting: SkillManagerCollectingSettings;
    inkmilling: SkillManagerInkmillingSettings;
}

interface SkillManager {
    settings: SkillManagerSettings;
    pranks: SkillManagerPranks;
    tarot: SkillManagerTarot;
    harvesting: SkillManagerHarvesting;
    transmutation: SkillManagerTransmutation;
    gathering: SkillManagerGathering;
    collecting: SkillManagerCollecting;
    inkmilling: SkillManagerInkmilling;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
}

export type SkillManagerClient = typeof client & {
    skillManager: SkillManager;
};
