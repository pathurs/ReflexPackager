import { FunctionItem } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';
import { DisplayServiceClient, TableGroupItemDefinition } from '../../display-service/display-service';

declare const client: InventoryManagerClient & DisplayServiceClient;

export const cliContainers = new FunctionItem(
    'inventory-manager:cli-containers',
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
                                        const value = client.inventorymanager.containers.tracked.find(value => value.id == container.id)
                                            ? client.displayservice.commandify('%lime%Yes', `inventory-manager containers untrack ${container.id}`, `Untrack ${container.name}`)
                                            : client.displayservice.commandify('%red%No', `inventory-manager containers track ${container.id}`, `Track ${container.name}`);

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
                        client.inventorymanager.error(`Unknown container '${containerId}'.`);

                        return;
                    }

                    if (!client.inventorymanager.containers.tracked.find(value => value.id == container.id)) {
                        client.inventorymanager.containers.tracked.push({
                            id: container.id,
                            items: []
                        });

                        send_command(`close ${containerId}`, 1);
                        send_GMCP('Char.Items.Contents', Number(containerId));

                        client.inventorymanager.echo(`Now tracking container '%white%${container.name}%end% (%white%${container.id}%end%)'.`);
                    }
                    else {
                        client.inventorymanager.echo(`Already tracking container '%white%${container.name}%end% (%white%${container.id}%end%)'.`);
                    }
                }
                break;

            case 'untrack':
                {
                    const containerId = args[1];
                    const container = client.inventorymanager.items.find(item => item.id === containerId);

                    if (!container) {
                        client.inventorymanager.error(`Unknown container '${containerId}'`);

                        return;
                    }

                    const index = client.inventorymanager.containers.tracked.findIndex(value => value.id === containerId);

                    if (index !== -1) {
                        client.inventorymanager.containers.tracked.splice(index, 1);

                        client.inventorymanager.echo(`No longer tracking container '%white%${container.name}%end% (%white%${container.id})%end%'.`);
                    }
                    else {
                        client.inventorymanager.echo(`Already not tracking container '%white%${container.name}%end% (%white%${container.id})%end%'.`);
                    }
                }
                break;

            case 'help':
            default:
                break;
        }

        client.inventorymanager.save();
    }
);
