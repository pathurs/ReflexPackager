import { FunctionItem } from '../source';
import { InventoryManagerClient } from './inventory-manager';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: InventoryManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.inventoryManager = {
            settings: client.systemService.defaultsDeep(get_variable('inventory-manager:settings'), {
                enabled: true,
                wielding: {
                    enabled: true
                },
                wearables: {
                    enabled: true,
                    expectedIds: []
                },
                groupables: {
                    enabled: true
                },
                containers: {
                    enabled: true,
                    tracked: []
                }
            }),
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%Inventory Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.inventoryManager.echo(`%red%${text}%end%`);
            },
            save() {
                client.systemService.save('inventory-manager', () => {
                    set_variable('inventory-manager:settings', client.inventoryManager.settings);

                    client.inventoryManager.echo('Settings saved.');
                });
            },
            wield(item, hand) {
                const isId = !isNaN(Number(item.match(/(\d+)/)?.[1]))

                const currentLeft = client.gmcpService.items.inv.find(value => value.attrib?.includes('l'));
                const currentRight = client.gmcpService.items.inv.find(value => value.attrib?.includes('L'));

                switch (hand) {
                    case 'left':
                        client.inventoryManager.expectedWield = 'left';

                        if (currentLeft) {
                            client.inventoryManager.expectdUnwield = 'left';
                        }

                        if (isId) {
                            client.inventoryManager.settings.wielding.expectedLeftId = item;
                        }

                        client.systemService.sendCommand(`wield left ${item}`);
                        break;

                    case 'right':
                        client.inventoryManager.expectedWield = 'right';

                        if (currentRight) {
                            client.inventoryManager.expectdUnwield = 'right';
                        }

                        if (isId) {
                            client.inventoryManager.settings.wielding.expectedRightId = item;
                        }

                        client.systemService.sendCommand(`wield right ${item}`);
                        break;

                    case 'both':
                        client.inventoryManager.expectdUnwield = 'both';
                        client.inventoryManager.expectedWield = 'both';

                        if (isId) {
                            client.inventoryManager.settings.wielding.expectedLeftId = item;
                            client.inventoryManager.settings.wielding.expectedRightId = item;
                        }

                        client.systemService.sendCommand(`wield ${item}`);
                        break;

                    default:
                        if (currentLeft && currentRight) {
                            client.inventoryManager.expectdUnwield = 'left';
                            client.inventoryManager.expectedWield = 'left';

                            if (isId) {
                                client.inventoryManager.settings.wielding.expectedLeftId = item;
                                client.inventoryManager.settings.wielding.expectedRightId = item;
                            }
                        }
                        else if (currentLeft) {
                            client.inventoryManager.expectedWield = 'right';

                            if (isId) {
                                client.inventoryManager.settings.wielding.expectedRightId = item;
                            }
                        }
                        else {
                            client.inventoryManager.expectedWield = 'left';

                            if (isId) {
                                client.inventoryManager.settings.wielding.expectedLeftId = item;
                            }
                        }

                        client.systemService.sendCommand(`wield ${item}`);
                        break;
                }

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventoryManager.expectdUnwield = 'both';
                }
            },
            unwield(itemOrHand: string) {
                const currentLeft = client.gmcpService.items.inv.find(value => value.attrib?.includes('l'));
                const currentRight = client.gmcpService.items.inv.find(value => value.attrib?.includes('L'));

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventoryManager.expectdUnwield = 'both';

                    client.inventoryManager.settings.wielding.expectedLeftId = undefined;
                    client.inventoryManager.settings.wielding.expectedRightId = undefined;
                }
                else {
                    switch (itemOrHand) {
                        case 'left':
                            client.inventoryManager.settings.wielding.expectedLeftId = undefined;
                            client.inventoryManager.expectdUnwield = 'left';

                            client.systemService.sendCommand(`unwield left`);
                            break;

                        case 'right':
                            client.inventoryManager.settings.wielding.expectedRightId = undefined;
                            client.inventoryManager.expectdUnwield = 'right';

                            client.systemService.sendCommand(`unwield right`);
                            break;

                        default:
                            client.inventoryManager.expectdUnwield = 'any';

                            client.systemService.sendCommand(`unwield ${itemOrHand}`);
                            break;
                    }
                }

                client.inventoryManager.save();
            }
        };

        client.gmcpService.subscribe(['Char.Items.List', 'Char.Items.Add', 'Char.Items.Remove', 'Char.Items.Update'], args => {
            if (args.gmcp_args.location === 'inv') {
                switch (args.gmcp_method) {
                    case 'Char.Items.List':
                        break;

                    case 'Char.Items.Add':
                        break;

                    case 'Char.Items.Remove':
                        break;

                    case 'Char.Items.Update':
                        {
                            const item = args.gmcp_args.item;
                            const newItem = client.gmcpService.items.inv.find(value => value.id === item.id);
                            const oldItem = client.gmcpService.previousItems.inv.find(value => value.id === item.id);

                            if (newItem && oldItem) {
                                updateItem(oldItem, newItem);
                            }
                        }
                        break;
                }

                function hasAttribute(item: GMCPCharItemsItem, attribute: GMCPCharItemsItemAttribute): boolean {
                    return item.attrib !== undefined && item.attrib?.includes(attribute);
                }

                function attributeChange(oldItem: GMCPCharItemsItem, newItem: GMCPCharItemsItem, attribute: GMCPCharItemsItemAttribute): 'add' | 'remove' | 'none' {
                    if (!hasAttribute(oldItem, attribute) && hasAttribute(newItem, attribute)) {
                        return 'add';
                    }
                    else if (hasAttribute(oldItem, attribute) && !hasAttribute(newItem, attribute)) {
                        return 'remove';
                    }
                    else {
                        return 'none';
                    }
                }

                function updateItem(oldItem: GMCPCharItemsItem, item: GMCPCharItemsItem) {
                    // Wielded, Left
                    if (attributeChange(oldItem, item, 'l') === 'add') {
                        if (client.inventoryManager.expectedWield === 'left') {
                            client.inventoryManager.settings.wielding.expectedLeftId = item.id;
                            client.inventoryManager.expectedWield = undefined;

                            client.inventoryManager.save();
                        }
                    }
                    else if (attributeChange(oldItem, item, 'l') === 'remove') {
                        if (client.inventoryManager.settings.wielding.expectedLeftId === item.id) {
                            if (['any', 'left', 'both'].includes(<string>client.inventoryManager.expectdUnwield)) {
                                client.inventoryManager.settings.wielding.expectedLeftId = undefined;
                                client.inventoryManager.expectdUnwield = undefined;
                            }
                            else {
                                client.systemService.sendCommand(`wield left ${item.id}`);
                            }
                        }
                        else if (client.inventoryManager.expectdUnwield) {
                            client.inventoryManager.expectdUnwield = undefined;
                        }
                    }

                    // Wielded, Right
                    if (attributeChange(oldItem, item, 'L') === 'add') {
                        if (client.inventoryManager.expectedWield === 'right') {
                            client.inventoryManager.settings.wielding.expectedRightId = item.id;
                            client.inventoryManager.expectedWield = undefined;

                            client.inventoryManager.save();
                        }
                    }
                    else if (attributeChange(oldItem, item, 'L') === 'remove') {
                        if (client.inventoryManager.settings.wielding.expectedRightId === item.id) {
                            if (['any', 'right', 'both'].includes(<string>client.inventoryManager.expectdUnwield)) {
                                client.inventoryManager.settings.wielding.expectedRightId = undefined;
                                client.inventoryManager.expectdUnwield = undefined;
                            }
                            else {
                                client.systemService.sendCommand(`wield right ${item.id}`);
                            }
                        }
                        else if (client.inventoryManager.expectdUnwield) {
                            client.inventoryManager.expectdUnwield = undefined;
                        }
                    }
                }
            }
            else if (args.gmcp_args.location.startsWith('rep')) {
                const containerId: string | undefined = (args.gmcp_args.location.match(/rep(\d+)/) || [])[1];
                const trackedContainer = client.inventoryManager.settings.containers.tracked.find(value => value.id == containerId);

                if (trackedContainer) {
                    send_GMCP('Char.Items.Contents', Number(trackedContainer.id));
                }
            }
        });

        client.inventoryManager.settings.containers.tracked.forEach(container => {
            send_GMCP('Char.Items.Contents', Number(container.id));
        });

        client.inventoryManager.echo('Loaded.');
    }
);
