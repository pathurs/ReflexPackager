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
                        updateItem(newItem);
                    }
                    else if (oldItem) {
                        removeItem(oldItem);
                    }
                    else if (newItem) {
                        addItem(newItem);
                    }
                    else {
                        throw new Error(`Inventory Manager: Unknown item: '${itemId}'`);
                    }
                });
                break;

            case 'Char.Items.Add':
                addItem((<GMCPCharItemsAdd>args.gmcp_args).item);
                break;

            case 'Char.Items.Remove':
                removeItem((<GMCPCharItemsRemove>args.gmcp_args).item);
                break;

            case 'Char.Items.Update':
                updateItem((<GMCPCharItemsUpdate>args.gmcp_args).item);
                break;
        }

        set_variable('inventory-manager:items', client.inventorymanager.items);
        set_variable('inventory-manager:wielding', client.inventorymanager.wielding);
        set_variable('inventory-manager:wearables', client.inventorymanager.wearables);
        set_variable('inventory-manager:groupables', client.inventorymanager.groupables);
        set_variable('inventory-manager:containers', client.inventorymanager.containers);
        set_variable('inventory-manager:corpses', client.inventorymanager.corpses);

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

        // function addItemTo<T extends keyof InventoryManager, D extends keyof InventoryManager[T]>(a: T, b: D, itemId: string) {
        //     const object = client.inventorymanager[a][b];

        //     if (!Array.isArray(object)) {
        //         return;
        //     }

        //     if (!object.includes(itemId)) {
        //         object.push(itemId);
        //     }
        // }

        // function removeItemFrom<T extends keyof InventoryManager, D extends keyof InventoryManager[T]>(a: T, b: D, itemId: string) {
        //     const object = client.inventorymanager[a][b];

        //     if (!Array.isArray(object)) {
        //         return;
        //     }

        //     if (!object.includes(itemId)) {
        //         const index = object.findIndex(id => id === itemId);
        //         object.splice(index, 1);
        //     }
        // }

        function addItem(item: GMCPCharItemsItem) {
            client.inventorymanager.items.push(item);

            if (item.attrib) {
                // // Worn
                // if (item.attrib.includes('w')) {
                //     addItemTo('wearables', 'allIds', item.id);
                //     addItemTo('wearables', 'wornIds', item.id);
                // }

                // // Wearable, not worn
                // if (item.attrib.includes('W')) {
                //     addItemTo('wearables', 'allIds', item.id);
                // }

                // // Wielded, Left
                // if (item.attrib.includes('l')) {
                //     client.inventorymanager.wielding.currentLeftId = item.id;
                // }

                // // Wielded, Right
                // if (item.attrib.includes('L')) {
                //     client.inventorymanager.wielding.currentRightId = item.id;
                // }

                // // Groupable
                // if (item.attrib.includes('g')) {
                //     addItemTo('groupables', 'allIds', item.id);
                // }

                // // Container
                // if (item.attrib.includes('c')) {
                //     addItemTo('containers', 'allIds', item.id);
                // }

                // // Corpse, Dead monster
                // if (item.attrib.includes('d')) {
                //     addItemTo('corpses', 'allIds', item.id);
                // }
            }
        }

        function removeItem(item: GMCPCharItemsItem) {
            const oldItem = client.inventorymanager.items.find(value => value.id === item.id);

            if (!oldItem) {
                return;
            }

            const index = client.inventorymanager.items.findIndex(value => value.id === item.id);

            client.inventorymanager.items.splice(index, 1);

            if (oldItem.attrib) {
                // // Worn
                // if (oldItem.attrib.includes('w')) {
                //     removeItemFrom('wearables', 'allIds', item.id);
                //     removeItemFrom('wearables', 'wornIds', item.id);
                // }

                // // Wearable, not worn
                // if (oldItem.attrib.includes('W')) {
                //     removeItemFrom('wearables', 'allIds', item.id);
                // }

                // // Wielded, Left
                // if (oldItem.attrib.includes('l')) {
                //     client.inventorymanager.wielding.currentLeftId = item.id;
                // }

                // // Wielded, Right
                // if (oldItem.attrib.includes('L')) {
                //     client.inventorymanager.wielding.currentRightId = item.id;
                // }

                // // Groupable
                // if (oldItem.attrib.includes('g')) {
                //     removeItemFrom('groupables', 'allIds', item.id);
                // }

                // // Container
                // if (oldItem.attrib.includes('c')) {
                //     removeItemFrom('containers', 'allIds', item.id);
                // }

                // // Corpse, Dead monster
                // if (oldItem.attrib.includes('d')) {
                //     removeItemFrom('corpses', 'allIds', item.id);
                // }
            }
        }

        function updateItem(item: GMCPCharItemsItem) {
            const oldItem = client.inventorymanager.items.find(value => value.id === item.id);

            if (!oldItem) {
                addItem(item);
                return;
            }

            const index = client.inventorymanager.items.findIndex(value => value.id === item.id);

            client.inventorymanager.items[index] = item;

            // // Worn
            // if (attributeChange(oldItem, item, 'w') === 'add') {
            //     addItemTo('wearables', 'allIds', item.id);
            //     addItemTo('wearables', 'wornIds', item.id);
            // }
            // else if (attributeChange(oldItem, item, 'w') === 'remove') {
            //     removeItemFrom('wearables', 'allIds', item.id);
            // }

            // // Wearable, not worn
            // if (attributeChange(oldItem, item, 'W') === 'add') {
            //     addItemTo('wearables', 'allIds', item.id);
            // }
            // else if (attributeChange(oldItem, item, 'W') === 'remove') {
            //     //
            // }

            // Wielded, Left
            if (attributeChange(oldItem, item, 'l') === 'add') {
                client.inventorymanager.wielding.currentLeftId = item.id;

                if (client.inventorymanager.wielding.expectdWield === 'left') {
                    client.inventorymanager.wielding.expectedLeftId = item.id;

                    client.inventorymanager.wielding.expectdWield = undefined;
                }
            }
            else if (attributeChange(oldItem, item, 'l') === 'remove') {
                if (!client.inventorymanager.wielding.expectdSwapHands) {
                    client.inventorymanager.wielding.currentLeftId = undefined;
                }

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
                client.inventorymanager.wielding.currentRightId = item.id;

                if (client.inventorymanager.wielding.expectdWield === 'right') {
                    client.inventorymanager.wielding.expectdRightId = item.id;

                    client.inventorymanager.wielding.expectdWield = undefined;
                }
            }
            else if (attributeChange(oldItem, item, 'L') === 'remove') {
                if (!client.inventorymanager.wielding.expectdSwapHands) {
                    client.inventorymanager.wielding.currentRightId = undefined;
                }

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

            // // Groupable
            // if (attributeChange(oldItem, item, 'g') === 'add') {
            //     addItemTo('groupables', 'allIds', item.id);
            // }
            // else if (attributeChange(oldItem, item, 'g') === 'remove') {
            //     removeItemFrom('groupables', 'allIds', item.id);
            // }

            // // Container
            // if (attributeChange(oldItem, item, 'c') === 'add') {
            //     addItemTo('containers', 'allIds', item.id);
            // }
            // else if (attributeChange(oldItem, item, 'c') === 'remove') {
            //     removeItemFrom('containers', 'allIds', item.id);
            // }

            // // Corpse, Dead monster
            // if (attributeChange(oldItem, item, 'd') === 'add') {
            //     addItemTo('corpses', 'allIds', item.id);
            // }
            // else if (attributeChange(oldItem, item, 'd') === 'remove') {
            //     removeItemFrom('corpses', 'allIds', item.id);
            // }
        }
    }
);
