type DescriptionDictionary = { [key: string]: string | undefined };
type EnvironmentDictionary = { [key: string]: string[] | undefined };
type RoomDictionary = { [key: string]: string[] | undefined };
type SkillManagerSkillName = keyof SkillManagerSkills['class'] | keyof SkillManagerSkills['general'] | keyof SkillManagerSkills['trade'];

interface SkillManagerSkill {
    active: boolean;
}

interface SkillManagerClassSkill extends SkillManagerSkill {
    classes: string[];
}

interface SkillManagerGeneralSkill extends SkillManagerSkill {

}

interface SkillManagerTradeSkill extends SkillManagerSkill {

}

//#region Pranks

type SkillManagerPranksProps = 'balloon' | 'blackjack' | 'itchpowder' | 'mickey';
type SkillManagerPranksPropAmount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type SkillManagerPranksIllusionColour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 'lethal';
type SkillManagerPranksRunAwayDistance = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface SkillManagerPranks extends SkillManagerClassSkill {
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

//#region Puppetry

interface SkillManagerPuppetry extends SkillManagerClassSkill {

}

interface SkillManagerPuppetrySettings {
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
    amount: number;
    queue: SkillManagerTarotInscribingQueue;
    start(): void;
    stop(): void;
    reset(): void;
    runQueue(): void;
}

interface SkillManagerTarot extends SkillManagerClassSkill {
    cards: string[];
    descriptionDictionary: DescriptionDictionary;
    inscribing: SkillManagerTarotInscribing;
}

interface SkillManagerTarotSettings {
    enabled: boolean;
}

//#endregion

//#region Tekura

interface SkillManagerTekura extends SkillManagerClassSkill {

}

interface SkillManagerTekuraSettings {
    enabled: boolean;
}

//#endregion

//#region Telepathy

interface SkillManagerTelepathy extends SkillManagerClassSkill {

}

interface SkillManagerTelepathySettings {
    enabled: boolean;
}

//#endregion

//#region Harvesting

interface SkillManagerHarvesting extends SkillManagerTradeSkill {
    harvestables: string[];
    descriptionDictionary: DescriptionDictionary;
}

interface SkillManagerHarvestingSettings {
    enabled: boolean;
}

//#endregion

//#region Transmutation

interface SkillManagerTransmutation extends SkillManagerTradeSkill {
    extractables: string[];
    descriptionDictionary: DescriptionDictionary;
}

interface SkillManagerTransmutationSettings {
    enabled: boolean;
}

//#endregion

//#region Gathering

interface SkillManagerButchering {
    running: boolean;
    descriptionDictionary: DescriptionDictionary;
    itemToRewield?: string;
    start(): void;
    stop(): void;
    butcher(): void;
}

interface SkillManagerGathering extends SkillManagerTradeSkill {
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

interface SkillManagerCollecting extends SkillManagerTradeSkill {
    running: boolean;
    automatic: boolean;
    waitingForPlants: boolean;
    waitingForMinerals: boolean;
    queue: Set<string>;
    day: string;
    rooms: RoomDictionary;
    start(): void;
    stop(): void;
    clear(): void;
    collect(): void;
    tryCollect(): void;
    onPlant(args: TriggerFunctionArgs & { 1: string }): void;
    onMineral(args: TriggerFunctionArgs & { 1: string }): void;
    onCollected(args: TriggerFunctionArgs & { 1?: string; 2: string; }): void;
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

interface SkillManagerInkmilling extends SkillManagerTradeSkill {
    running: boolean;
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

//#region Settings

interface SkillManagerClassSkillSettings {
    pranks: SkillManagerPranksSettings;
    puppetry: SkillManagerPuppetrySettings;
    tarot: SkillManagerTarotSettings;
    tekura: SkillManagerTekuraSettings;
    telepathy: SkillManagerTelepathySettings;
}

interface SkillManagerGeneralSkillSettings {

}

interface SkillManagerTradeSkillSettings {
    harvesting: SkillManagerHarvestingSettings;
    transmutation: SkillManagerTransmutationSettings;
    gathering: SkillManagerGatheringSettings;
    collecting: SkillManagerCollectingSettings;
    inkmilling: SkillManagerInkmillingSettings;
}

interface SkillManagerSettings {
    enabled: boolean;
    class: SkillManagerClassSkillSettings;
    general: SkillManagerGeneralSkillSettings;
    trade: SkillManagerTradeSkillSettings;
}

//#endregion

interface SkillManagerClassSkills {
    pranks: SkillManagerPranks;
    puppetry: SkillManagerPuppetry;
    tarot: SkillManagerTarot;
    tekura: SkillManagerTekura;
    telepathy: SkillManagerTelepathy;
}

interface SkillManagerGeneralSkills {

}

interface SkillManagerTradeSkills {
    harvesting: SkillManagerHarvesting;
    transmutation: SkillManagerTransmutation;
    gathering: SkillManagerGathering;
    collecting: SkillManagerCollecting;
    inkmilling: SkillManagerInkmilling;
}

interface SkillManagerSkills {
    class: SkillManagerClassSkills;
    general: SkillManagerGeneralSkills;
    trade: SkillManagerTradeSkills;
}

interface SkillManager {
    settings: SkillManagerSettings;
    skills: SkillManagerSkills;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    onAbility<Skill extends SkillManagerSkillName>(
        skill: Skill,
        ability: string,
        command: string | undefined,
        eventOrEvents: string | string[],
        args: TriggerFunctionArgs | MultiLineTriggerFunctionArgs
    ): void;
}

export type SkillManagerClient = typeof client & {
    skillManager: SkillManager;
};
