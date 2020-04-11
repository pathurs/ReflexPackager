import { HuntingManagerClient, HuntingManager } from '../hunting-manager';
import { FunctionItem } from '../../source';

declare const client: HuntingManagerClient;

export const onRoomChange = new FunctionItem(
    'hunting-manager:onRoomChange',
    function (args: GMCPFunctionArgs) {
        switch (args.gmcp_method) {
            case 'Char.Items.List':
                client.huntingmanager.potentialTargets = [];

                (<GMCPCharItemsList>args.gmcp_args).items.forEach(item => {
                    addItem(item);
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

        function addItemTo<T extends keyof HuntingManager, D extends keyof HuntingManager[T]>(a: T, b: D, itemId: string) {
            const object = client.huntingmanager[a][b];

            if (!Array.isArray(object)) {
                return;
            }

            if (!object.includes(itemId)) {
                object.push(itemId);
            }
        }

        function removeItemFrom<T extends keyof HuntingManager, D extends keyof HuntingManager[T]>(a: T, b: D, itemId: string) {
            const object = client.huntingmanager[a][b];

            if (!Array.isArray(object)) {
                return;
            }

            if (!object.includes(itemId)) {
                const index = object.findIndex(id => id === itemId);
                object.splice(index, 1);
            }
        }

        function addItem(item: GMCPCharItemsItem) {
            client.huntingmanager.items.push(item);

            if (item.attrib) {
                // Worn
                if (item.attrib.includes('w')) {
                    addItemTo('wearables', 'allIds', item.id);
                    addItemTo('wearables', 'wornIds', item.id);
                }

                // Wearable, not worn
                if (item.attrib.includes('W')) {
                    addItemTo('wearables', 'allIds', item.id);
                }

                // Wielded, Left
                if (item.attrib.includes('l')) {
                    client.huntingmanager.wielding.currentLeftId = item.id;
                }

                // Wielded, Right
                if (item.attrib.includes('L')) {
                    client.huntingmanager.wielding.currentRightId = item.id;
                }

                // Groupable
                if (item.attrib.includes('g')) {
                    addItemTo('groupables', 'allIds', item.id);
                }

                // Container
                if (item.attrib.includes('c')) {
                    addItemTo('containers', 'allIds', item.id);
                }

                // Corpse, Dead monster
                if (item.attrib.includes('d')) {
                    addItemTo('corpses', 'allIds', item.id);
                }
            }
        }

        function removeItem(item: GMCPCharItemsItem) {
            const oldItem = client.huntingmanager.items.find(value => value.id === item.id);

            if (!oldItem) {
                return;
            }

            const index = client.huntingmanager.items.findIndex(value => value.id === item.id);

            client.huntingmanager.items.splice(index, 1);

            if (oldItem.attrib) {
                // Worn
                if (oldItem.attrib.includes('w')) {
                    removeItemFrom('wearables', 'allIds', item.id);
                    removeItemFrom('wearables', 'wornIds', item.id);
                }

                // Wearable, not worn
                if (oldItem.attrib.includes('W')) {
                    removeItemFrom('wearables', 'allIds', item.id);
                }

                // Wielded, Left
                if (oldItem.attrib.includes('l')) {
                    client.huntingmanager.wielding.currentLeftId = item.id;
                }

                // Wielded, Right
                if (oldItem.attrib.includes('L')) {
                    client.huntingmanager.wielding.currentRightId = item.id;
                }

                // Groupable
                if (oldItem.attrib.includes('g')) {
                    removeItemFrom('groupables', 'allIds', item.id);
                }

                // Container
                if (oldItem.attrib.includes('c')) {
                    removeItemFrom('containers', 'allIds', item.id);
                }

                // Corpse, Dead monster
                if (oldItem.attrib.includes('d')) {
                    removeItemFrom('corpses', 'allIds', item.id);
                }
            }
        }

        function updateItem(item: GMCPCharItemsItem) {
            const oldItem = client.huntingmanager.items.find(value => value.id === item.id);

            if (!oldItem) {
                addItem(item);
                return;
            }

            const index = client.huntingmanager.items.findIndex(value => value.id === item.id);

            client.huntingmanager.items[index] = item;

            // Worn
            if (attributeChange(oldItem, item, 'w') === 'add') {
                addItemTo('wearables', 'allIds', item.id);
                addItemTo('wearables', 'wornIds', item.id);
            }
            else if (attributeChange(oldItem, item, 'w') === 'remove') {
                removeItemFrom('wearables', 'allIds', item.id);
            }

            // Wearable, not worn
            if (attributeChange(oldItem, item, 'W') === 'add') {
                addItemTo('wearables', 'allIds', item.id);
            }
            else if (attributeChange(oldItem, item, 'W') === 'remove') {
                //
            }

            // Wielded, Left
            if (attributeChange(oldItem, item, 'l') === 'add') {
                client.huntingmanager.wielding.currentLeftId = item.id;

                if (client.huntingmanager.wielding.expectdWield === 'left') {
                    client.huntingmanager.wielding.expectedLeftId = item.id;

                    client.huntingmanager.wielding.expectdWield = undefined;
                }
            }
            else if (attributeChange(oldItem, item, 'l') === 'remove') {
                if (!client.huntingmanager.wielding.expectdSwapHands) {
                    client.huntingmanager.wielding.currentLeftId = undefined;
                }

                if (client.huntingmanager.wielding.expectedLeftId === item.id) {
                    if (['any', 'left', 'both'].includes(<string>client.huntingmanager.wielding.expectdUnwield)) {
                        client.huntingmanager.wielding.expectedLeftId = undefined;
                        client.huntingmanager.wielding.expectdUnwield = undefined;
                    }
                    else {
                        send_command(`wield left ${item.id}`, 1);
                    }
                }
                else if (client.huntingmanager.wielding.expectdUnwield) {
                    client.huntingmanager.wielding.expectdUnwield = undefined;
                }
            }

            // Wielded, Right
            if (attributeChange(oldItem, item, 'L') === 'add') {
                client.huntingmanager.wielding.currentRightId = item.id;

                if (client.huntingmanager.wielding.expectdWield === 'right') {
                    client.huntingmanager.wielding.expectdRightId = item.id;

                    client.huntingmanager.wielding.expectdWield = undefined;
                }
            }
            else if (attributeChange(oldItem, item, 'L') === 'remove') {
                if (!client.huntingmanager.wielding.expectdSwapHands) {
                    client.huntingmanager.wielding.currentRightId = undefined;
                }

                if (client.huntingmanager.wielding.expectdRightId === item.id) {
                    if (['any', 'right', 'both'].includes(<string>client.huntingmanager.wielding.expectdUnwield)) {
                        client.huntingmanager.wielding.expectdRightId = undefined;
                        client.huntingmanager.wielding.expectdUnwield = undefined;
                    }
                    else {
                        send_command(`wield right ${item.id}`, 1);
                    }
                }
                else if (client.huntingmanager.wielding.expectdUnwield) {
                    client.huntingmanager.wielding.expectdUnwield = undefined;
                }
            }

            // Groupable
            if (attributeChange(oldItem, item, 'g') === 'add') {
                addItemTo('groupables', 'allIds', item.id);
            }
            else if (attributeChange(oldItem, item, 'g') === 'remove') {
                removeItemFrom('groupables', 'allIds', item.id);
            }

            // Container
            if (attributeChange(oldItem, item, 'c') === 'add') {
                addItemTo('containers', 'allIds', item.id);
            }
            else if (attributeChange(oldItem, item, 'c') === 'remove') {
                removeItemFrom('containers', 'allIds', item.id);
            }

            // Corpse, Dead monster
            if (attributeChange(oldItem, item, 'd') === 'add') {
                addItemTo('corpses', 'allIds', item.id);
            }
            else if (attributeChange(oldItem, item, 'd') === 'remove') {
                removeItemFrom('corpses', 'allIds', item.id);
            }
        }
    }
);
