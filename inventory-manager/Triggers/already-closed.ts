import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & GMCPServiceClient;

export const alreadyClosed = new TriggerItem(
    'Already Closed',
    /^([\w\W]+) is already closed\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                const containerDescription: string | undefined = args[1];

                if (!containerDescription) {
                    return;
                }

                const containers = client.gmcpService.items.inv
                    .filter(value => value.attrib?.includes('c') && value.name === containerDescription);

                const trackedContainers = client.inventoryManager.settings.containers.tracked
                    .filter(value => containers.map(value => value.id).includes(value.id));

                if (trackedContainers.length === 0) {
                    return;
                }

                let initial = JSON.stringify(trackedContainers);

                trackedContainers.forEach(trackedContainer => {
                    trackedContainer.closeable = true;
                    trackedContainer.possiblyOpen = false;
                });

                let changed = JSON.stringify(trackedContainers);

                client.inventoryManager.expectedClose = undefined;

                if (initial !== changed) {
                    client.inventoryManager.save();
                }
            }
        )
    ]
);
