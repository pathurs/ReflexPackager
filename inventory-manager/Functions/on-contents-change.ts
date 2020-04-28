import { InventoryManagerClient } from '../inventory-manager';
import { FunctionItem } from '../../source';

declare const client: InventoryManagerClient;

export const onContentsChange = new FunctionItem(
    'inventory-manager:onContentsChange',
    function (args: GMCPFunctionArgs<'Char.Items.List' | 'Char.Items.Add' | 'Char.Items.Remove' | 'Char.Items.Update'>) {
        const containerId: string | undefined = (args.gmcp_args.location.match(/rep(\d+)/) || [])[1];
        const trackedContainer = client.inventorymanager.containers.tracked.find(value => value.id == containerId);

        if (!trackedContainer) {
            return;
        }

        const container = trackedContainer;

        switch (args.gmcp_method) {
            case 'Char.Items.List':
                const items = new Set([
                    ...container.items.map(item => item.id),
                    ...(<GMCPCharItemsList>args.gmcp_args).items.map(item => item.id)
                ]);

                items.forEach(itemId => {
                    const oldItem = container.items.find(value => value.id === itemId);
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
                        throw new Error(`Inventory Manager(inventory-manager:onContentsChange): Unknown item: '${itemId}'`);
                    }
                });
                break;

            case 'Char.Items.Add':
                {
                    const item = (<GMCPCharItemsAdd>args.gmcp_args).item;
                    const oldItem = container.items.find(value => value.id === item.id);

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
                    const oldItem = container.items.find(value => value.id === item.id);

                    if (oldItem) {
                        removeItem(item);
                    }
                }
                break;

            case 'Char.Items.Update':
                {
                    const item = (<GMCPCharItemsAdd>args.gmcp_args).item;
                    const oldItem = container.items.find(value => value.id === item.id);

                    if (oldItem) {
                        updateItem(oldItem, item);
                    }
                    else {
                        addItem(item);
                    }
                }
                break;
        }

        client.inventorymanager.save();

        function addItem(item: GMCPCharItemsItem) {
            container.items.push(item);
        }

        function removeItem(item: GMCPCharItemsItem) {
            const index = container.items.findIndex(value => value.id === item.id);

            container.items.splice(index, 1);
        }

        function updateItem(_oldItem: GMCPCharItemsItem, item: GMCPCharItemsItem) {
            const index = container.items.findIndex(value => value.id === item.id);

            container.items[index] = item;
        }
    }
);
