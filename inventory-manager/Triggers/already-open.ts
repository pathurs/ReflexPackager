import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & GMCPServiceClient;

export const alreadyOpen = new TriggerItem(
    'Already Closed',
    /^([\w\W]+) is already open\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                const containerDescription: string | undefined = args[1];

                if (!containerDescription) {
                    return;
                }

                const containers = client.gmcpservice.items.inv
                    .filter(value => value.attrib?.includes('c') && value.name === containerDescription);

                const trackedContainers = client.inventorymanager.settings.containers.tracked
                    .filter(value => containers.map(value => value.id).includes(value.id));

                if (trackedContainers.length === 0) {
                    return;
                }

                trackedContainers.forEach(trackedContainer => {
                    trackedContainer.closeable = true;
                    trackedContainer.possiblyOpen = true;
                });

                client.inventorymanager.expectedOpen = undefined;

                client.inventorymanager.save();
            }
        )
    ]
);
