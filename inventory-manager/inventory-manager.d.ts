interface Wearables {
    enabled: boolean;
    expectedIds: string[];
}

interface Wielding {
    enabled: boolean;
    expectedLeftId?: string;
    expectdRightId?: string;
    expectedWield?: 'left' | 'right' | 'both';
    expectdUnwield?: 'any' | 'left' | 'right' | 'both';
    expectdSwapHands?: boolean;
}

interface Groupables {
    enabled: boolean;
}

interface TrackedContainer {
    id: string;
    closeable?: boolean;
    possiblyOpen?: boolean;
    items: GMCPCharItemsItem[];
}

interface Containers {
    enabled: boolean;
    tracked: TrackedContainer[];
    expectedOpen?: string;
    expectedClose?: string;
}

interface Corpses {
    enabled: boolean;
}

export interface InventoryManager {
    enabled: boolean;
    items: GMCPCharItemsItem[];
    wearables: Wearables;
    wielding: Wielding;
    groupables: Groupables;
    containers: Containers;
    corpses: Corpses;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
}

export type InventoryManagerClient = typeof client & {
    inventorymanager: InventoryManager;
};
