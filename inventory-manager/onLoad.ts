import { FunctionItem } from '../source';
import { InventoryManagerClient } from './inventory-manager';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: InventoryManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.inventorymanager = {
            settings: get_variable('inventory-manager:settings') || {
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
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%Inventory Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.inventorymanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('inventory-manager', () => {
                    set_variable('inventory-manager:settings', client.inventorymanager.settings);

                    client.inventorymanager.echo('Settings saved.');
                });
            },
            wield(item, hand) {
                const isId = !isNaN(Number(item.match(/(\d+)/)?.[1]))

                const currentLeft = client.gmcpservice.items.inv.find(value => value.attrib?.includes('l'));
                const currentRight = client.gmcpservice.items.inv.find(value => value.attrib?.includes('L'));

                switch (hand) {
                    case 'left':
                        client.inventorymanager.expectedWield = 'left';

                        if (currentLeft) {
                            client.inventorymanager.expectdUnwield = 'left';
                        }

                        if (isId) {
                            client.inventorymanager.settings.wielding.expectedLeftId = item;
                        }

                        client.systemservice.sendCommand(`wield left ${item}`);
                        break;

                    case 'right':
                        client.inventorymanager.expectedWield = 'right';

                        if (currentRight) {
                            client.inventorymanager.expectdUnwield = 'right';
                        }

                        if (isId) {
                            client.inventorymanager.settings.wielding.expectedRightId = item;
                        }

                        client.systemservice.sendCommand(`wield right ${item}`);
                        break;

                    case 'both':
                        client.inventorymanager.expectdUnwield = 'both';
                        client.inventorymanager.expectedWield = 'both';

                        if (isId) {
                            client.inventorymanager.settings.wielding.expectedLeftId = item;
                            client.inventorymanager.settings.wielding.expectedRightId = item;
                        }

                        client.systemservice.sendCommand(`wield ${item}`);
                        break;

                    default:
                        if (currentLeft && currentRight) {
                            client.inventorymanager.expectdUnwield = 'left';
                            client.inventorymanager.expectedWield = 'left';

                            if (isId) {
                                client.inventorymanager.settings.wielding.expectedLeftId = item;
                                client.inventorymanager.settings.wielding.expectedRightId = item;
                            }
                        }
                        else if (currentLeft) {
                            client.inventorymanager.expectedWield = 'right';

                            if (isId) {
                                client.inventorymanager.settings.wielding.expectedRightId = item;
                            }
                        }
                        else {
                            client.inventorymanager.expectedWield = 'left';

                            if (isId) {
                                client.inventorymanager.settings.wielding.expectedLeftId = item;
                            }
                        }

                        client.systemservice.sendCommand(`wield ${item}`);
                        break;
                }

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventorymanager.expectdUnwield = 'both';
                }
            },
            unwield(itemOrHand: string) {
                const currentLeft = client.gmcpservice.items.inv.find(value => value.attrib?.includes('l'));
                const currentRight = client.gmcpservice.items.inv.find(value => value.attrib?.includes('L'));

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventorymanager.expectdUnwield = 'both';

                    client.inventorymanager.settings.wielding.expectedLeftId = undefined;
                    client.inventorymanager.settings.wielding.expectedRightId = undefined;
                }
                else {
                    switch (itemOrHand) {
                        case 'left':
                            client.inventorymanager.settings.wielding.expectedLeftId = undefined;
                            client.inventorymanager.expectdUnwield = 'left';

                            client.systemservice.sendCommand(`unwield left`);
                            break;

                        case 'right':
                            client.inventorymanager.settings.wielding.expectedRightId = undefined;
                            client.inventorymanager.expectdUnwield = 'right';

                            client.systemservice.sendCommand(`unwield right`);
                            break;

                        default:
                            client.inventorymanager.expectdUnwield = 'any';

                            client.systemservice.sendCommand(`unwield ${itemOrHand}`);
                            break;
                    }
                }

                client.inventorymanager.save();
            }
        };

        client.gmcpservice.subscribe(['Char.Items.List', 'Char.Items.Add', 'Char.Items.Remove', 'Char.Items.Update'], args => {
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
                            const newItem = client.gmcpservice.items.inv.find(value => value.id === item.id);
                            const oldItem = client.gmcpservice.previousItems.inv.find(value => value.id === item.id);

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
                        if (client.inventorymanager.expectedWield === 'left') {
                            client.inventorymanager.settings.wielding.expectedLeftId = item.id;
                            client.inventorymanager.expectedWield = undefined;

                            client.inventorymanager.save();
                        }
                    }
                    else if (attributeChange(oldItem, item, 'l') === 'remove') {
                        if (client.inventorymanager.settings.wielding.expectedLeftId === item.id) {
                            if (['any', 'left', 'both'].includes(<string>client.inventorymanager.expectdUnwield)) {
                                client.inventorymanager.settings.wielding.expectedLeftId = undefined;
                                client.inventorymanager.expectdUnwield = undefined;
                            }
                            else {
                                client.systemservice.sendCommand(`wield left ${item.id}`);
                            }
                        }
                        else if (client.inventorymanager.expectdUnwield) {
                            client.inventorymanager.expectdUnwield = undefined;
                        }
                    }

                    // Wielded, Right
                    if (attributeChange(oldItem, item, 'L') === 'add') {
                        if (client.inventorymanager.expectedWield === 'right') {
                            client.inventorymanager.settings.wielding.expectedRightId = item.id;
                            client.inventorymanager.expectedWield = undefined;

                            client.inventorymanager.save();
                        }
                    }
                    else if (attributeChange(oldItem, item, 'L') === 'remove') {
                        if (client.inventorymanager.settings.wielding.expectedRightId === item.id) {
                            if (['any', 'right', 'both'].includes(<string>client.inventorymanager.expectdUnwield)) {
                                client.inventorymanager.settings.wielding.expectedRightId = undefined;
                                client.inventorymanager.expectdUnwield = undefined;
                            }
                            else {
                                client.systemservice.sendCommand(`wield right ${item.id}`);
                            }
                        }
                        else if (client.inventorymanager.expectdUnwield) {
                            client.inventorymanager.expectdUnwield = undefined;
                        }
                    }
                }
            }
            else if (args.gmcp_args.location.startsWith('rep')) {
                const containerId: string | undefined = (args.gmcp_args.location.match(/rep(\d+)/) || [])[1];
                const trackedContainer = client.inventorymanager.settings.containers.tracked.find(value => value.id == containerId);

                if (trackedContainer) {
                    send_GMCP('Char.Items.Contents', Number(trackedContainer.id));
                }
            }
        });

        client.inventorymanager.settings.containers.tracked.forEach(container => {
            send_GMCP('Char.Items.Contents', Number(container.id));
        });

        client.inventorymanager.echo('Loaded.');
    }
);
