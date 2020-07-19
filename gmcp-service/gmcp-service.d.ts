type GMCPLatest = Partial<GMCPServerMethodToArgsMap>;

type GMCPSubscriber<TMethod extends GMCPServerMethod> = (args: GMCPFunctionArgs<TMethod>) => void;

interface GMCPSubscription<TMethod extends GMCPServerMethod> {
    methods: TMethod[];
    subscriber: GMCPSubscriber<TMethod>;
}

interface GMCPServiceSkills {
    groups: GMCPCharSkillsGroupsGroup[];
}

interface GMCPServiceItems {
    [key: string]: GMCPCharItemsItem[] | undefined;
    inv: GMCPCharItemsItem[];
    room: GMCPCharItemsItem[];
}

type GMCPServiceRoom = GMCPRoomInfo;

type GMCPServiceRiftItem = GMCPRiftItem & { id: string };

interface GMCPServiceRift {
    [key: string]: GMCPServiceRiftItem | undefined;
}

interface GMCPService {
    latest: GMCPLatest;
    subscriptions: GMCPSubscription<GMCPServerMethod>[];
    vitals: GMCPCharVitals;
    previousVitals: GMCPCharVitals;
    status: GMCPCharStatus;
    previousStatus: GMCPCharStatus;
    room: GMCPServiceRoom;
    previousRoom: GMCPServiceRoom;
    // skills: GMCPServiceSkills;
    items: GMCPServiceItems;
    previousItems: GMCPServiceItems;
    defences: GMCPCharDefencesDefence[];
    previousDefences: GMCPCharDefencesDefence[];
    afflictions: GMCPCharAfflictionsAffliction[];
    previousAfflictions: GMCPCharAfflictionsAffliction[];
    rift: GMCPServiceRift;
    previousRift: GMCPServiceRift;
    echo(message: string): void;
    error(text: string): void;
    subscribe<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>): GMCPSubscription<TMethod>;
    unsubscribe(subscription: GMCPSubscription<GMCPServerMethod>): void;
    once<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>): GMCPSubscription<TMethod>;
}

export type GMCPServiceClient = typeof client & {
    gmcpService: GMCPService;
};
