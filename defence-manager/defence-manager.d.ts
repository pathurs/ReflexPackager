type SkillName =
    | 'vision'
    | 'tattoos'
    | 'survival'
    | 'weaponry'
    | 'items'
    | 'riding'
    | 'pranks'
    | 'tarot'
    | 'puppetry'
    ;

interface SkillActivation {
    command: string;
    causesBalance: boolean;
    needsBalance: boolean;
}

interface SkillDeactivation {
    command: string;
    causesBalance: boolean;
    needsBalance: boolean;
}

interface DefenceSkill {
    skill: SkillName;
    activate: SkillActivation;
    deactivate?: SkillDeactivation;
}

interface Defence<T extends 'permanent' | 'draining' | 'room' | 'timed' | 'temporary'> {
    name: string;
    type: T;
    skills: DefenceSkill[];
}

interface PermanentDefence extends Defence<'permanent'> {

}

interface DrainingDefence extends Defence<'draining'> {

}

interface RoomDefence extends Defence<'room'> {

}

interface TimedDefence extends Defence<'timed'> {

}

interface TemporaryDefence extends Defence<'temporary'> {

}

interface Defences {
    nightsight: PermanentDefence;
    vigilance: DrainingDefence;
    treewatch: DrainingDefence;
    deathsight: PermanentDefence;
    skywatch: PermanentDefence;
    groundwatch: PermanentDefence;
    hypersight: DrainingDefence;
    thirdeye: PermanentDefence;
    telesense: DrainingDefence;
    softfocus: DrainingDefence;

    firefly: TimedDefence;
    moss: PermanentDefence;
    shield: TemporaryDefence;
    mindseye: PermanentDefence;
    cloak: PermanentDefence;
    bell: PermanentDefence;
    moon: PermanentDefence;
    starburst: PermanentDefence;
    boar: PermanentDefence;
    megalith: PermanentDefence;
    ox: PermanentDefence;
    chameleon: PermanentDefence;

    selfishness: PermanentDefence;
    metawake: DrainingDefence;
    insomnia: PermanentDefence;
    clinging: PermanentDefence;
    breathing: TemporaryDefence;
    curseward: PermanentDefence;

    parry: PermanentDefence;

    mount: PermanentDefence;

    prismatic: TemporaryDefence;

    slipperiness: PermanentDefence;
    balancing: DrainingDefence;
    acrobatics: DrainingDefence;
    arrowcatch: DrainingDefence;

    sun: RoomDefence;
    devil: TemporaryDefence;

    gripping: PermanentDefence;
}

interface DefenceManager {
    defences: Defences;
    currentDefenceIds: string[];
    expectedDefenceIds: string[];
    echo(text: string): void;
    error(text: string): void;
}

export type DefenceManagerClient = typeof client & {
    defencemanager: DefenceManager;
};
