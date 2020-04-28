interface ShopStorefront {
    items: GMCPCharItemsItem[];
    expectedTotem?: GMCPCharItemsItem;
    expectedKeySigil?: GMCPCharItemsItem;
    expectedEyeSigil?: GMCPCharItemsItem;
    expectedMonolithSigil?: GMCPCharItemsItem;
    expectedOther: GMCPCharItemsItem[];
}

interface ShopStockroom {
    items: GMCPCharItemsItem[];
    expectedTotem?: GMCPCharItemsItem;
    expectedKeySigil?: GMCPCharItemsItem;
    expectedEyeSigil?: GMCPCharItemsItem;
    expectedMonolithSigil?: GMCPCharItemsItem;
    expectedShimmeringOrb?: GMCPCharItemsItem;
    expectedOther: GMCPCharItemsItem[];
}

interface Shop {
    room: GMCPRoomInfo;
    storefront: ShopStorefront;
    stockroom: ShopStockroom;
}

interface ShopManager {
    enabled: boolean;
    shops: Shop[];
    echo(message: string): void;
    error(text: string): void;
    save(): void;
}

export type ShopManagerClient = typeof client & {
    shopmanager: ShopManager;
};
