import { InventoryManagerClient } from '../inventory-manager';
import { FunctionItem } from '../../source';

declare const client: InventoryManagerClient;

export const onInventoryChange = new FunctionItem(
    'inventory-manager:onInventoryChange',
    function (args: GMCPFunctionArgs<'Char.Items.List' | 'Char.Items.Add' | 'Char.Items.Remove' | 'Char.Items.Update'>) {
        switch (args.gmcp_method) {
            case 'Char.Items.List':
                const items = new Set([
                    ...client.inventorymanager.items.map(item => item.id),
                    ...(<GMCPCharItemsList>args.gmcp_args).items.map(item => item.id)
                ]);

                items.forEach(itemId => {
                    const oldItem = client.inventorymanager.items.find(value => value.id === itemId);
                    const newItem = (<GMCPCharItemsList>args.gmcp_args).items.find(value => value.id === itemId);

                    if (oldItem && newItem) {
                        updateItem(oldItem, newItem);
                    }
                    else if (oldItem) {
                        removeItem(oldItem);
                    }
                    else if (newItem) {
                        addItem(newItem);
                    }
                    else {
                        throw new Error(`Inventory Manager(inventory-manager:onInventoryChange): Unknown item: '${itemId}'`);
                    }
                });
                break;

            case 'Char.Items.Add':
                {
                    const item = (<GMCPCharItemsAdd>args.gmcp_args).item;
                    const oldItem = client.inventorymanager.items.find(value => value.id === item.id);

                    if (oldItem) {
                        updateItem(oldItem, item);
                    }
                    else {
                        addItem(item);
                    }
                }
                break;

            case 'Char.Items.Remove':
                {
                    const item = (<GMCPCharItemsAdd>args.gmcp_args).item;
                    const oldItem = client.inventorymanager.items.find(value => value.id === item.id);

                    if (oldItem) {
                        removeItem(item);
                    }
                }
                break;

            case 'Char.Items.Update':
                {
                    const item = (<GMCPCharItemsAdd>args.gmcp_args).item;
                    const oldItem = client.inventorymanager.items.find(value => value.id === item.id);

                    if (oldItem) {
                        updateItem(oldItem, item);
                    }
                    else {
                        addItem(item);
                    }
                }
                break;
        }

        run_function('inventory-manager:save', undefined, 'Inventory Manager');

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

        function addItem(item: GMCPCharItemsItem) {
            client.inventorymanager.items.push(item);
        }

        function removeItem(item: GMCPCharItemsItem) {
            const index = client.inventorymanager.items.findIndex(value => value.id === item.id);

            client.inventorymanager.items.splice(index, 1);
        }

        function updateItem(oldItem: GMCPCharItemsItem, item: GMCPCharItemsItem) {
            const index = client.inventorymanager.items.findIndex(value => value.id === item.id);

            client.inventorymanager.items[index] = item;

            // Wielded, Left
            if (attributeChange(oldItem, item, 'l') === 'add') {
                if (client.inventorymanager.wielding.expectdWield === 'left') {
                    client.inventorymanager.wielding.expectedLeftId = item.id;

                    client.inventorymanager.wielding.expectdWield = undefined;
                }
            }
            else if (attributeChange(oldItem, item, 'l') === 'remove') {
                if (client.inventorymanager.wielding.expectedLeftId === item.id) {
                    if (['any', 'left', 'both'].includes(<string>client.inventorymanager.wielding.expectdUnwield)) {
                        client.inventorymanager.wielding.expectedLeftId = undefined;
                        client.inventorymanager.wielding.expectdUnwield = undefined;
                    }
                    else {
                        send_command(`wield left ${item.id}`, 1);
                    }
                }
                else if (client.inventorymanager.wielding.expectdUnwield) {
                    client.inventorymanager.wielding.expectdUnwield = undefined;
                }
            }

            // Wielded, Right
            if (attributeChange(oldItem, item, 'L') === 'add') {
                if (client.inventorymanager.wielding.expectdWield === 'right') {
                    client.inventorymanager.wielding.expectdRightId = item.id;

                    client.inventorymanager.wielding.expectdWield = undefined;
                }
            }
            else if (attributeChange(oldItem, item, 'L') === 'remove') {
                if (client.inventorymanager.wielding.expectdRightId === item.id) {
                    if (['any', 'right', 'both'].includes(<string>client.inventorymanager.wielding.expectdUnwield)) {
                        client.inventorymanager.wielding.expectdRightId = undefined;
                        client.inventorymanager.wielding.expectdUnwield = undefined;
                    }
                    else {
                        send_command(`wield right ${item.id}`, 1);
                    }
                }
                else if (client.inventorymanager.wielding.expectdUnwield) {
                    client.inventorymanager.wielding.expectdUnwield = undefined;
                }
            }
        }
    }
);
