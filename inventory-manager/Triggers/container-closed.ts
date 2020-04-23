import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const containerClosed = new TriggerItem(
    `Container Closed`,
    /^You close ([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                const containerDescription: string | undefined = args[1];

                if (!containerDescription) {
                    return;
                }

                const containers = client.inventorymanager.items
                    .filter(value => value.attrib?.includes('c') && value.name === containerDescription);

                const trackedContainers = client.inventorymanager.containers.tracked
                    .filter(value => containers.map(value => value.id).includes(value.id));

                if (trackedContainers.length === 0) {
                    return;
                }

                trackedContainers.forEach(trackedContainer => {
                    trackedContainer.closeable = true;
                    trackedContainer.possiblyOpen = false;
                });

                client.inventorymanager.containers.expectedClose = undefined;

                run_function('inventory-manager:save', undefined, 'Inventory Manager');
            }
        )
    ]
);