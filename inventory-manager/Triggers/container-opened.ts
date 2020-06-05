import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient & GMCPServiceClient;

export const containerOpened = new TriggerItem(
    `Container Opened`,
    /^You open ([\w\W]+)\.$/,
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
                    trackedContainer.closeable = true;
                    trackedContainer.possiblyOpen = true;

                    send_GMCP('Char.Items.Contents', Number(trackedContainer.id));

                    if (client.inventoryManager.expectedOpen !== trackedContainer.id) {
                        client.systemService.sendCommand(`close ${trackedContainer.id}`);
                    }
                });

                client.inventoryManager.expectedOpen = undefined;

                client.inventoryManager.save();
            }
        )
    ]
);
