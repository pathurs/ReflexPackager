import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SystemServiceClient } from 'system-service/system-service';
import { ShopManagerClient } from './shop-manager';

declare const client: ShopManagerClient & DisplayServiceClient & GMCPServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.shopmanager = {
            settings: get_variable('shop-manager:settings') || {
                enabled: true,
                shops: []
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%Shop Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.shopmanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('shop-manager', () => {
                    set_variable('shop-manager:settings', client.shopmanager.settings);

                    client.shopmanager.echo('Settings saved.');
                });
            },
            getCurrentShop() {
                const currentShop = client.shopmanager.settings.shops.find(value => value.room.num === client.gmcpservice.room.num);

                return currentShop;
            },
            registerShop() {
                let currentShop = client.shopmanager.getCurrentShop();

                if (currentShop) {
                    client.shopmanager.error(`Shop '%lightgray%${client.gmcpservice.room.name}%end%' (%lightgray%${client.gmcpservice.room.num}%end%) is already registered.`);

                    return;
                }

                currentShop = {
                    room: client.gmcpservice.room,
                    storefront: {
                        roomId: client.gmcpservice.room.num,
                        expectedItemIds: []
                    },
                    stockroom: {
                        roomId: <number>client.gmcpservice.room.exits.d,
                        expectedItemIds: []
                    },
                    currentBins: {
                        0: {
                            id: 0
                        },
                        1: {
                            id: 1
                        },
                        2: {
                            id: 2
                        },
                        3: {
                            id: 3
                        },
                        4: {
                            id: 4
                        },
                        5: {
                            id: 5
                        },
                        6: {
                            id: 6
                        },
                        7: {
                            id: 7
                        }
                    },
                    expectedBins: {
                        0: {
                            id: 0
                        },
                        1: {
                            id: 1
                        },
                        2: {
                            id: 2
                        },
                        3: {
                            id: 3
                        },
                        4: {
                            id: 4
                        },
                        5: {
                            id: 5
                        },
                        6: {
                            id: 6
                        },
                        7: {
                            id: 7
                        }
                    },
                    currentPolicies: [],
                    expectedPolicies: []
                };

                client.shopmanager.settings.shops.push(currentShop);

                client.shopmanager.save();

                client.shopmanager.echo(`Registered shop '%lightgray%${client.gmcpservice.room.name}%end%' (%lightgray%${client.gmcpservice.room.num}%end%).`);

                return currentShop;
            },
            unregisterShop() {
                const currentShop = client.shopmanager.getCurrentShop();

                if (!currentShop) {
                    client.shopmanager.error(`Shop '%lightgray%${client.gmcpservice.room.name}%end%' (%lightgray%${client.gmcpservice.room.num}%end%) is not registered.`);

                    return;
                }

                client.shopmanager.save();

                client.shopmanager.echo(`Unregistered shop '%lightgray%${client.gmcpservice.room.name}%end%' (%lightgray%${client.gmcpservice.room.num}%end%).`);
            },
            checkStorefront(shop, items) {
                if (shop.storefront.expectedTotemId) {
                    const expectedTotem = items.find(value => value.id === shop.storefront.expectedTotemId);

                    if (!expectedTotem) {
                        client.shopmanager.error(`Storefront totem '%lightgray%${shop.storefront.expectedTotemId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedEyeSigilId) {
                    const expectedEyeSigil = items.find(value => value.id === shop.storefront.expectedEyeSigilId);

                    if (!expectedEyeSigil) {
                        client.shopmanager.error(`Storefront eye sigil '%lightgray%${shop.storefront.expectedEyeSigilId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedKeySigilId) {
                    const expectedKeySigil = items.find(value => value.id === shop.storefront.expectedKeySigilId);

                    if (!expectedKeySigil) {
                        client.shopmanager.error(`Storefront key sigil '%lightgray%${shop.storefront.expectedKeySigilId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedMonolithSigilId) {
                    const expectedMonolithSigil = items.find(value => value.id === shop.storefront.expectedMonolithSigilId);

                    if (!expectedMonolithSigil) {
                        client.shopmanager.error(`Storefront monolith sigil '%lightgray%${shop.storefront.expectedMonolithSigilId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedItemIds.length > 0) {
                    shop.storefront.expectedItemIds.forEach(expectedId => {
                        const expected = items.find(value => value.id === expectedId);

                        if (!expected) {
                            client.shopmanager.error(`Storefront item '%lightgray%${expectedId}%end%' is missing!`);
                        }
                    });
                }
            },
            checkStockroom(shop, items) {
                if (shop.stockroom.expectedTotemId) {
                    const expectedTotem = items.find(value => value.id === shop.stockroom.expectedTotemId);

                    if (!expectedTotem) {
                        client.shopmanager.error(`Stockroom totem '%lightgray%${shop.stockroom.expectedTotemId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedEyeSigilId) {
                    const expectedEyeSigil = items.find(value => value.id === shop.stockroom.expectedEyeSigilId);

                    if (!expectedEyeSigil) {
                        client.shopmanager.error(`Stockroom eye sigil '%lightgray%${shop.stockroom.expectedEyeSigilId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedKeySigilId) {
                    const expectedKeySigil = items.find(value => value.id === shop.stockroom.expectedKeySigilId);

                    if (!expectedKeySigil) {
                        client.shopmanager.error(`Stockroom key sigil '%lightgray%${shop.stockroom.expectedKeySigilId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedMonolithSigilId) {
                    const expectedMonolithSigil = items.find(value => value.id === shop.stockroom.expectedMonolithSigilId);

                    if (!expectedMonolithSigil) {
                        client.shopmanager.error(`Stockroom monolith sigil '%lightgray%${shop.stockroom.expectedMonolithSigilId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedShimmeringOrbId) {
                    const expectedShimmeringOrb = items.find(value => value.id === shop.stockroom.expectedShimmeringOrbId);

                    if (!expectedShimmeringOrb) {
                        client.shopmanager.error(`Stockroom shimmering orb '%lightgray%${shop.stockroom.expectedShimmeringOrbId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedItemIds.length > 0) {
                    shop.stockroom.expectedItemIds.forEach(expectedId => {
                        const expected = items.find(value => value.id === expectedId);

                        if (!expected) {
                            client.shopmanager.error(`Stockroom item '%lightgray%${expectedId}%end%' is missing!`);
                        }
                    });
                }
            },
            parseRawBinVisibility(visibility) {
                const [, type, exception] = visibility.toLowerCase().trim().match(/^(all|none)(?: except ((?:group|person|code) \w+))?^/) || [];

                if (!type) {
                    client.shopmanager.error(`Could not parse bin visibility '${visibility}'.`)
                    client.shopmanager.echo(`Syntax: %lightgray%ALL|NONE%end%.`);
                    client.shopmanager.echo(`Syntax: %lightgray%ALL|NONE EXCEPT GROUP|PERSON|CODE value%end%.`);

                    return undefined;
                }

                return {
                    type,
                    exception
                };
            },
            setBinName(id, name) {
                if (id < 0 || id > 7 || !Number.isInteger(id)) {
                    client.shopmanager.error(`Bin ID '${id}' is invalid. The bin ID must be a whole number between 0 and 7.`);

                    return;
                }

                const currentShop = client.shopmanager.getCurrentShop();

                if (!currentShop) {
                    client.shopmanager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                if (id === 0 && name !== undefined) {
                    client.shopmanager.error(`Cannot name bin 0.`);

                    return;
                }

                currentShop.expectedBins[id] = {
                    id,
                    name
                };

                client.shopmanager.save();

                client.shopmanager.echo(`Set bin '%lightgray%${id}%end%' name to '%lightgray%${name}%end%'.`);
            },
            setBinVisibility(id, visibility) {
                if (id < 0 || id > 7 || !Number.isInteger(id)) {
                    client.shopmanager.error(`Bin ID '${id}' is invalid. The bin ID must be a whole number between 0 and 7.`);

                    return;
                }

                const currentShop = client.shopmanager.getCurrentShop();

                if (!currentShop) {
                    client.shopmanager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                currentShop.expectedBins[id] = {
                    id,
                    visibility
                };

                client.shopmanager.save();

                client.shopmanager.echo(`Set bin '%lightgray%${id}%end%' visibility to '%lightgray%${JSON.stringify(visibility)}%end%'.`);
            },
            parseRawPolicy(rawPolicy) {
                const [, type, who, modifier] = <[string, 'group' | 'person' | undefined, string | undefined, string | undefined]>rawPolicy
                    .toLowerCase()
                    .trim()
                    .match(/^(group|person) (\w+) (\w+)$/) || [];

                if (!type || !who || !modifier) {
                    client.shopmanager.error(`Could not parse policy '%lightgray%${rawPolicy}%end%'.`)
                    client.shopmanager.echo(`Syntax: %lightgray%GROUP|PERSON who modifier%end%.`);
                    client.shopmanager.echo(`Syntax: %lightgray%GROUP|PERSON <who REFUSE%end%.`);

                    return undefined;
                }

                const parsedModifier = modifier === 'refuse' ? 'refuse' : Number(modifier);

                if (parsedModifier !== 'refuse' && isNaN(parsedModifier)) {
                    client.shopmanager.error(`Could not parse modifier '%lightgray%${modifier}%end%' in policy '%lightgray%${rawPolicy}%end%'.`)
                    client.shopmanager.echo(`Syntax: %lightgray%GROUP|PERSON who modifier%end%.`);
                    client.shopmanager.echo(`Syntax: %lightgray%GROUP|PERSON who REFUSE%end%.`);

                    return undefined;
                }

                return {
                    type,
                    who,
                    modifier: parsedModifier
                };
            },
            addPolicy(policy) {
                const currentShop = client.shopmanager.getCurrentShop();

                if (!currentShop) {
                    client.shopmanager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                currentShop.expectedPolicies.push(policy);

                client.shopmanager.save();

                client.shopmanager.echo(`Added policy '%lightgray%${JSON.stringify(policy)}%end%'.`);
            },
            removePolicy(id: number) {
                const currentShop = client.shopmanager.getCurrentShop();

                if (!currentShop) {
                    client.shopmanager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                const policy = currentShop.expectedPolicies[id];

                if (!policy) {
                    client.shopmanager.error(`Could not find policy '${id}'.`);

                    return;
                }

                currentShop.expectedPolicies.splice(id, 1);

                client.shopmanager.echo(`Removed policy '%lightgray%${id}%end%'.`);

                client.shopmanager.save();
            }
        };

        // Keep Storefront Items and Stockroom Items up to date
        client.gmcpservice.subscribe(['Room.Info'], args => {
            const roomId = args.gmcp_args.num;
            const shop = client.shopmanager.settings.shops.find(value => value.room.num === roomId);

            if (shop) {
                const items = client.gmcpservice.items.room;

                if (shop.storefront.roomId === roomId) {
                    client.shopmanager.checkStorefront(shop, items);
                }
                else if (shop.stockroom.roomId === roomId) {
                    client.shopmanager.checkStockroom(shop, items);
                }
            }
        });

        client.shopmanager.echo('Loaded.');
    }
);
