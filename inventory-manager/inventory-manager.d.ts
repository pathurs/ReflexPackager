interface Wearables {
    enabled: boolean;
    expectedIds: string[];
}

interface Wielding {
    enabled: boolean;
    currentLeftId?: string;
    currentRightId?: string;
    expectedLeftId?: string;
    expectdRightId?: string;
    expectdWield?: 'left' | 'right' | 'both';
    expectdUnwield?: 'any' | 'left' | 'right' | 'both';
    expectdSwapHands?: boolean;
}

interface Groupables {
    enabled: boolean;
}

interface Containers {
    enabled: boolean;
    trackedIds: string[];
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
}

export type InventoryManagerClient = typeof client & {
    inventorymanager: InventoryManager;
};
