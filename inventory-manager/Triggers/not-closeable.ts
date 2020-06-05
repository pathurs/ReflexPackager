import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & GMCPServiceClient;

export const notCloseable = new TriggerItem(
    `Not Closeable`,
    /^([\w\W]+) doesn't have a lid or top of any sort to be (?:opened|closed)\.$/,
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

                trackedContainers.forEach(trackedContainer => {
                    if (client.inventoryManager.expectedOpen === trackedContainer.id || client.inventoryManager.expectedClose === trackedContainer.id) {
                        trackedContainer.closeable = false;
                        trackedContainer.possiblyOpen = undefined;
                    }
                });

                client.inventoryManager.save();
            }
        )
    ]
);
