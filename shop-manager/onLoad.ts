import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SystemServiceClient } from 'system-service/system-service';
import { QueueManagerClient } from 'queue-manager/queue-manager';
import { ShopManagerClient, ShopBinIds } from './shop-manager';

declare const client: ShopManagerClient & DisplayServiceClient & GMCPServiceClient & SystemServiceClient & QueueManagerClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.shopManager = {
            settings: client.systemService.defaultsDeep(get_variable('shop-manager:settings'), {
                enabled: true,
                shops: []
            }),
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%Shop Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.shopManager.echo(`%red%${text}%end%`);
            },
            save() {
                client.systemService.save('shop-manager', () => {
                    set_variable('shop-manager:settings', client.shopManager.settings);

                    client.shopManager.echo('Settings saved.');
                });
            },
            getCurrentShop() {
                const currentShop = client.shopManager.settings.shops.find(value => value.room.num === client.gmcpService.room.num);

                return currentShop;
            },
            registerShop() {
                let currentShop = client.shopManager.getCurrentShop();

                if (currentShop) {
                    client.shopManager.error(`Shop '%lightgray%${client.gmcpService.room.name}%end%' (%lightgray%${client.gmcpService.room.num}%end%) is already registered.`);

                    return;
                }

                currentShop = {
                    room: client.gmcpService.room,
                    storefront: {
                        roomId: client.gmcpService.room.num,
                        expectedItemIds: []
                    },
                    stockroom: {
                        roomId: <number>client.gmcpService.room.exits.d,
                        expectedItemIds: []
                    },
                    currentBins: {
                        '0': {
                            id: '0'
                        },
                        '1': {
                            id: '1'
                        },
                        '2': {
                            id: '2'
                        },
                        '3': {
                            id: '3'
                        },
                        '4': {
                            id: '4'
                        },
                        '5': {
                            id: '5'
                        },
                        '6': {
                            id: '6'
                        },
                        '7': {
                            id: '7'
                        }
                    },
                    bins: {
                        '0': {
                            id: '0'
                        },
                        '1': {
                            id: '1'
                        },
                        '2': {
                            id: '2'
                        },
                        '3': {
                            id: '3'
                        },
                        '4': {
                            id: '4'
                        },
                        '5': {
                            id: '5'
                        },
                        '6': {
                            id: '6'
                        },
                        '7': {
                            id: '7'
                        }
                    },
                    currentPolicies: [],
                    policies: []
                };

                client.shopManager.settings.shops.push(currentShop);

                client.shopManager.save();

                client.shopManager.echo(`Registered shop '%lightgray%${client.gmcpService.room.name}%end%' (%lightgray%${client.gmcpService.room.num}%end%).`);

                return currentShop;
            },
            unregisterShop() {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`Shop '%lightgray%${client.gmcpService.room.name}%end%' (%lightgray%${client.gmcpService.room.num}%end%) is not registered.`);

                    return;
                }

                client.shopManager.save();

                client.shopManager.echo(`Unregistered shop '%lightgray%${client.gmcpService.room.name}%end%' (%lightgray%${client.gmcpService.room.num}%end%).`);
            },
            checkStorefront(shop, items) {
                if (shop.storefront.expectedTotemId) {
                    const expectedTotem = items.find(value => value.id === shop.storefront.expectedTotemId);

                    if (!expectedTotem) {
                        client.shopManager.error(`Storefront totem '%lightgray%${shop.storefront.expectedTotemId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedEyeSigilId) {
                    const expectedEyeSigil = items.find(value => value.id === shop.storefront.expectedEyeSigilId);

                    if (!expectedEyeSigil) {
                        client.shopManager.error(`Storefront eye sigil '%lightgray%${shop.storefront.expectedEyeSigilId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedKeySigilId) {
                    const expectedKeySigil = items.find(value => value.id === shop.storefront.expectedKeySigilId);

                    if (!expectedKeySigil) {
                        client.shopManager.error(`Storefront key sigil '%lightgray%${shop.storefront.expectedKeySigilId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedMonolithSigilId) {
                    const expectedMonolithSigil = items.find(value => value.id === shop.storefront.expectedMonolithSigilId);

                    if (!expectedMonolithSigil) {
                        client.shopManager.error(`Storefront monolith sigil '%lightgray%${shop.storefront.expectedMonolithSigilId}%end%' is missing!`);
                    }
                }

                if (shop.storefront.expectedItemIds.length > 0) {
                    shop.storefront.expectedItemIds.forEach(expectedId => {
                        const expected = items.find(value => value.id === expectedId);

                        if (!expected) {
                            client.shopManager.error(`Storefront item '%lightgray%${expectedId}%end%' is missing!`);
                        }
                    });
                }
            },
            checkStockroom(shop, items) {
                if (shop.stockroom.expectedTotemId) {
                    const expectedTotem = items.find(value => value.id === shop.stockroom.expectedTotemId);

                    if (!expectedTotem) {
                        client.shopManager.error(`Stockroom totem '%lightgray%${shop.stockroom.expectedTotemId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedEyeSigilId) {
                    const expectedEyeSigil = items.find(value => value.id === shop.stockroom.expectedEyeSigilId);

                    if (!expectedEyeSigil) {
                        client.shopManager.error(`Stockroom eye sigil '%lightgray%${shop.stockroom.expectedEyeSigilId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedKeySigilId) {
                    const expectedKeySigil = items.find(value => value.id === shop.stockroom.expectedKeySigilId);

                    if (!expectedKeySigil) {
                        client.shopManager.error(`Stockroom key sigil '%lightgray%${shop.stockroom.expectedKeySigilId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedMonolithSigilId) {
                    const expectedMonolithSigil = items.find(value => value.id === shop.stockroom.expectedMonolithSigilId);

                    if (!expectedMonolithSigil) {
                        client.shopManager.error(`Stockroom monolith sigil '%lightgray%${shop.stockroom.expectedMonolithSigilId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedShimmeringOrbId) {
                    const expectedShimmeringOrb = items.find(value => value.id === shop.stockroom.expectedShimmeringOrbId);

                    if (!expectedShimmeringOrb) {
                        client.shopManager.error(`Stockroom shimmering orb '%lightgray%${shop.stockroom.expectedShimmeringOrbId}%end%' is missing!`);
                    }
                }

                if (shop.stockroom.expectedItemIds.length > 0) {
                    shop.stockroom.expectedItemIds.forEach(expectedId => {
                        const expected = items.find(value => value.id === expectedId);

                        if (!expected) {
                            client.shopManager.error(`Stockroom item '%lightgray%${expectedId}%end%' is missing!`);
                        }
                    });
                }
            },
            parseRawBinVisibility(visibility) {
                const [, type, exception] = visibility.toLowerCase().trim().match(/^(all|none)(?: except ((?:group|person|code) \w+))?^/) || [];

                if (!type) {
                    client.shopManager.error(`Could not parse bin visibility '${visibility}'.`)
                    client.shopManager.echo(`Syntax: %lightgray%ALL|NONE%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%ALL|NONE EXCEPT GROUP|PERSON|CODE value%end%.`);

                    return undefined;
                }

                return {
                    type,
                    exception
                };
            },
            setBinName(id, name) {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                if (id === '0' && name !== undefined) {
                    client.shopManager.error(`Cannot name bin 0.`);

                    return;
                }

                currentShop.bins[id] = {
                    id,
                    name
                };

                client.shopManager.save();

                client.shopManager.echo(`Set bin '%lightgray%${id}%end%' name to '%lightgray%${name}%end%'.`);
            },
            setBinVisibility(id, visibility) {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                currentShop.bins[id] = {
                    id,
                    visibility
                };

                client.shopManager.save();

                client.shopManager.echo(`Set bin '%lightgray%${id}%end%' visibility to '%lightgray%${JSON.stringify(visibility)}%end%'.`);
            },
            parseRawPolicy(rawPolicy) {
                const [, type, who, modifier] = <[string, 'group' | 'person' | undefined, string | undefined, string | undefined]>rawPolicy
                    .toLowerCase()
                    .trim()
                    .match(/^(group|person) ([a-z]+) (\+\d+|\-\d+|0|refuse)$/) || [];

                if (!type || !who || !modifier) {
                    client.shopManager.error(`Could not parse policy '%lightgray%${rawPolicy}%end%'.`)
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who +percent%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who -percent%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who 0%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who REFUSE%end%.`);

                    return undefined;
                }

                const parsedModifier = modifier === 'refuse' || modifier === '0' ? 'refuse' : Number(modifier);

                if (parsedModifier !== 'refuse' && isNaN(parsedModifier)) {
                    client.shopManager.error(`Could not parse policy '%lightgray%${rawPolicy}%end%'.`)
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who +percent%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who -percent%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who 0%end%.`);
                    client.shopManager.echo(`Syntax: %lightgray%GROUP|PERSON who REFUSE%end%.`);

                    return undefined;
                }

                return {
                    type,
                    who,
                    modifier: parsedModifier
                };
            },
            addPolicy(policy) {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                currentShop.policies.push(policy);

                client.shopManager.save();

                client.shopManager.echo(`Added policy '%lightgray%${JSON.stringify(policy)}%end%'.`);
            },
            removePolicy(id: number) {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                const policy = currentShop.policies[id];

                if (!policy) {
                    client.shopManager.error(`Could not find policy '${id}'.`);

                    return;
                }

                currentShop.policies.splice(id, 1);

                client.shopManager.echo(`Removed policy '%lightgray%${id}%end%'.`);

                client.shopManager.save();
            },
            do(command) {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                client.shopManager.echo(`Doing: '%lightgray%${command}%end%'.`);

                client.queueManager.appendCommand(`unlock door down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`open door down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`close door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`lock door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(command, 'equilibriumBalance', 'equilibriumBalance');
                client.queueManager.appendCommand(`unlock door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`open door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`close door down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`lock door down`, 'equilibriumBalance');
            },
            updateStockroom() {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                client.shopManager.echo(`Updating stockroom.`);

                client.queueManager.appendCommand(`unlock door down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`open door down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`close door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`lock door up`, 'equilibriumBalance');

                currentShop.policies.forEach(policy => {
                    const modifier = typeof policy.modifier === 'number'
                        ? (policy.modifier > 0 ? `+${policy.modifier}` : policy.modifier)
                        : policy.modifier;

                    client.queueManager.appendCommand(`price policy add ${policy.type} ${policy.who} ${modifier}`, 'equilibriumBalance');
                });

                client.queueManager.appendCommand(`price policy list`, 'equilibriumBalance');

                for (let binId in currentShop.bins) {
                    const bin = currentShop.bins[<ShopBinIds>binId];

                    if ('name' in bin && bin.name) {
                        client.queueManager.appendCommand(`price bin ${binId} name ${bin.name}`, 'equilibriumBalance');
                    }

                    if (bin.visibility) {
                        if (bin.visibility.exception) {
                            client.queueManager.appendCommand(`price bin ${binId} ${bin.visibility.type} except ${bin.visibility.exception}`, 'equilibriumBalance');
                        }
                        else {
                            client.queueManager.appendCommand(`price bin ${binId} ${bin.visibility.type}`, 'equilibriumBalance');
                        }
                    }
                }

                client.queueManager.appendCommand(`unlock door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`open door up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`up`, 'equilibriumBalance');
                client.queueManager.appendCommand(`close door down`, 'equilibriumBalance');
                client.queueManager.appendCommand(`lock door down`, 'equilibriumBalance');
            }
        };

        // Keep Storefront Items and Stockroom Items up to date
        client.gmcpService.subscribe(['Room.Info'], args => {
            const roomId = args.gmcp_args.num;
            const currentShop = client.shopManager.settings.shops.find(value => value.storefront.roomId === roomId || value.stockroom.roomId === roomId);

            if (currentShop) {
                const items = client.gmcpService.items.room;

                if (currentShop.storefront.roomId === roomId) {
                    client.shopManager.checkStorefront(currentShop, items);
                }
                else if (currentShop.stockroom.roomId === roomId) {
                    client.shopManager.checkStockroom(currentShop, items);
                }
            }
        });

        client.shopManager.echo('Loaded.');
    }
);
