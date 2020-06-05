interface InventoryManagerWearables {
    enabled: boolean;
    expectedIds: string[];
}

interface InventoryManagerWielding {
    enabled: boolean;
    expectedLeftId?: string;
    expectedRightId?: string;
}

interface InventoryManagerGroupables {
    enabled: boolean;
}

interface InventoryManagerTrackedContainer {
    id: string;
    closeable?: boolean;
    possiblyOpen?: boolean;
    items: GMCPCharItemsItem[];
}

interface InventoryManagerContainers {
    enabled: boolean;
    tracked: InventoryManagerTrackedContainer[];
}

interface InventoryManagerSettings {
    enabled: boolean;
    wearables: InventoryManagerWearables;
    wielding: InventoryManagerWielding;
    groupables: InventoryManagerGroupables;
    containers: InventoryManagerContainers;
}

export interface InventoryManager {
    settings: InventoryManagerSettings;
    expectedWield?: 'left' | 'right' | 'both';
    expectdUnwield?: 'any' | 'left' | 'right' | 'both';
    expectdSwapHands?: boolean;
    expectedOpen?: string;
    expectedClose?: string;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    wield(item: string, hand?: 'left' | 'right' | 'both'): void;
    unwield(hand: 'left' | 'right'): void;
    unwield(item: string): void;
}

export type InventoryManagerClient = typeof client & {
    inventoryManager: InventoryManager;
};
