import { FunctionItem } from '../../source';
import { DisplayServiceClient, TableGroupItemDefinition } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient;

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
                            items: client.gmcpservice.items.inv
                                .filter(item => item.attrib?.includes('c'))
                                .map<TableGroupItemDefinition>(
                                    container => {
                                        const label = `${container.id} ${container.name}`;
                                        const value = client.inventorymanager.settings.containers.tracked.find(value => value.id == container.id)
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
                    const container = client.gmcpservice.items.inv.find(item => item.id === containerId);

                    if (!container) {
                        client.inventorymanager.error(`Unknown container '${containerId}'.`);

                        return;
                    }

                    if (!client.inventorymanager.settings.containers.tracked.find(value => value.id == container.id)) {
                        client.inventorymanager.settings.containers.tracked.push({
                            id: container.id,
                            items: []
                        });

                        client.systemservice.sendCommand(`close ${containerId}`);
                        send_GMCP('Char.Items.Contents', Number(containerId));

                        client.inventorymanager.echo(`Now tracking container '%lightgray%${container.name}%end% (%lightgray%${container.id}%end%)'.`);
                    }
                    else {
                        client.inventorymanager.echo(`Already tracking container '%lightgray%${container.name}%end% (%lightgray%${container.id}%end%)'.`);
                    }
                }
                break;

            case 'untrack':
                {
                    const containerId = args[1];
                    const container = client.gmcpservice.items.inv.find(item => item.id === containerId);

                    if (!container) {
                        client.inventorymanager.error(`Unknown container '${containerId}'`);

                        return;
                    }

                    const index = client.inventorymanager.settings.containers.tracked.findIndex(value => value.id === containerId);

                    if (index !== -1) {
                        client.inventorymanager.settings.containers.tracked.splice(index, 1);

                        client.inventorymanager.echo(`No longer tracking container '%lightgray%${container.name}%end% (%lightgray%${container.id})%end%'.`);
                    }
                    else {
                        client.inventorymanager.echo(`Already not tracking container '%lightgray%${container.name}%end% (%lightgray%${container.id})%end%'.`);
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
