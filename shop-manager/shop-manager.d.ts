interface ShopStorefront {
    roomId: number;
    expectedTotemId?: string;
    expectedEyeSigilId?: string;
    expectedKeySigilId?: string;
    expectedMonolithSigilId?: string;
    expectedItemIds: string[];
}

interface ShopStockroom {
    roomId: number;
    expectedTotemId?: string;
    expectedEyeSigilId?: string;
    expectedKeySigilId?: string;
    expectedMonolithSigilId?: string;
    expectedShimmeringOrbId?: string;
    expectedItemIds: string[];
}

interface ShopBinVisibility {
    type: string;
    exception?: string;
}

interface ShopDefaultBin {
    id: number;
    visibility?: ShopBinVisibility;
    hasChanges?: boolean;
}

interface ShopBin {
    id: number;
    name?: string;
    visibility?: ShopBinVisibility;
}

interface ShopBins {
    0: ShopDefaultBin;
    1: ShopBin;
    2: ShopBin;
    3: ShopBin;
    4: ShopBin;
    5: ShopBin;
    6: ShopBin;
    7: ShopBin;
}

interface ShopUnsavedPolicy {
    type: 'person' | 'group';
    who: string;
    modifier: number | 'refuse';
}

interface ShopPolicy extends ShopUnsavedPolicy {
    number: number;
}

interface Shop {
    room: GMCPRoomInfo;
    storefront: ShopStorefront;
    stockroom: ShopStockroom;
    currentBins: ShopBins;
    expectedBins: ShopBins;
    currentPolicies: ShopPolicy[];
    expectedPolicies: ShopUnsavedPolicy[];
}

interface ShopManagerSettings {
    enabled: boolean;
    shops: Shop[];
}

interface ShopManager {
    settings: ShopManagerSettings;
    echo(message: string): void;
    error(text: string): void;
    save(): void;
    getCurrentShop(): Shop | undefined;
    registerShop(): void;
    unregisterShop(): void;
    checkStorefront(shop: Shop, items: GMCPCharItemsItem[]): void;
    checkStockroom(shop: Shop, items: GMCPCharItemsItem[]): void;
    parseRawBinVisibility(visibility: string): ShopBinVisibility | undefined;
    setBinName(id: keyof ShopBins, name: string): void;
    setBinVisibility(id: keyof ShopBins, visibility: ShopBinVisibility): void;
    parseRawPolicy(modifier: string): ShopUnsavedPolicy | undefined;
    addPolicy(policy: ShopUnsavedPolicy): void;
    removePolicy(id: number): void;
}

export type ShopManagerClient = typeof client & {
    shopmanager: ShopManager;
};
