type DescriptionDictionary = { [key: string]: string | undefined };
type EnvironmentDictionary = { [key: string]: string[] | undefined };

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

interface SkillManagerSettings {
    enabled: boolean;
    harvesting: SkillManagerHarvestingSettings;
    transmutation: SkillManagerTransmutationSettings;
    gathering: SkillManagerGatheringSettings;
    collecting: SkillManagerCollectingSettings;
    inkmilling: SkillManagerInkmillingSettings;
    tarot: SkillManagerTarotSettings;
}

interface SkillManager {
    settings: SkillManagerSettings;
    harvesting: SkillManagerHarvesting;
    transmutation: SkillManagerTransmutation;
    gathering: SkillManagerGathering;
    collecting: SkillManagerCollecting;
    inkmilling: SkillManagerInkmilling;
    tarot: SkillManagerTarot;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
}

export type SkillManagerClient = typeof client & {
    skillmanager: SkillManager;
};
