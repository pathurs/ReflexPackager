import { FunctionItem } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';
import { DisplayServiceClient, TableGroupItemDefinition } from '../../display-service/display-service';

declare const client: InventoryManagerClient & DisplayServiceClient;

export const containers = new FunctionItem(
    'inventory-manager:containers',
    function (args: string[]) {
        switch (args[0]) {
            case undefined:
            case 'show':
                client.displayservice.table(
                    'Inventory Manager - Containers',
                    [
                        {
                            title: undefined,
                            columns: 4,
                            items: [
                                {
                                    label: 'Enabled',
                                    value: 'Yes',
                                    // hint: 'Whether to manage containers.'
                                }
                            ]
                        },
                        {
                            title: 'Tracking',
                            columns: 1,
                            items: client.inventorymanager.items
                                .filter(item => item.attrib?.includes('c'))
                                .map<TableGroupItemDefinition>(
                                    container => {
                                        const label = `${container.id} ${container.name}`;
                                        const value = client.inventorymanager.containers.trackedIds.includes(container.id)
                                            ? client.displayservice.clickify('Yes', `inventory-manager containers untrack ${container.id}`, `Untrack ${container.name}`, '#00ff00')
                                            : client.displayservice.clickify('No', `inventory-manager containers track ${container.id}`, `Track ${container.name}`, '#ff0000');

                                        return {
                                            label,
                                            value
                                        }
                                    }
                                )
                        }
                    ]
                );
                break;

            case 'track':
                {
                    const containerId = args[1];
                    const container = client.inventorymanager.items.find(item => item.id === containerId);

                    if (!container) {
                        throw new Error(`Inventory Manager: Unknown container '${containerId}'`);
                    }

                    if (!client.inventorymanager.containers.trackedIds.includes(container.id)) {
                        client.inventorymanager.containers.trackedIds.push(container.id);

                        display_notice(`Inventory Manager: Now tracking container '${container.name} (${container.id})'.`);
                    }
                    else {
                        display_notice(`Inventory Manager: Already tracking container '${container.name} (${container.id})'.`);
                    }
                }
                break;

            case 'untrack':
                {
                    const containerId = args[1];
                    const container = client.inventorymanager.items.find(item => item.id === containerId);

                    if (!container) {
                        throw new Error(`Inventory Manager: Unknown container '${containerId}'`);
                    }

                    const index = client.inventorymanager.containers.trackedIds.indexOf(containerId);

                    if (index !== -1) {
                        client.inventorymanager.containers.trackedIds.splice(index, 1);

                        display_notice(`Inventory Manager: No longer tracking container '${container.name} (${container.id})'.`);
                    }
                    else {
                        display_notice(`Inventory Manager: Already not tracking container '${container.name} (${container.id})'.`);
                    }
                }
                break;

            case 'help':
            default:
                break;
        }
    }
);
