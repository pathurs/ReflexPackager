import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient & SystemServiceClient & GMCPServiceClient;

export const sheathe = new AliasItem(
    'Sheathe',
    /^sheathe (left|right|[\w\d]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: 'left' | 'right' | string }) {
                client.systemService.sendCommand(args[0]);

                const currentLeft = client.gmcpService.items.inv.find(value => value.attrib?.includes('l'));
                const currentRight = client.gmcpService.items.inv.find(value => value.attrib?.includes('L'));

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventoryManager.expectdUnwield = 'both';

                    client.inventoryManager.settings.wielding.expectedLeftId = undefined;
                    client.inventoryManager.settings.wielding.expectedRightId = undefined;
                }
                else {
                    switch (args[1]) {
                        case 'left':
                            client.inventoryManager.settings.wielding.expectedLeftId = undefined;
                            client.inventoryManager.expectdUnwield = 'left';
                            break;

                        case 'right':
                            client.inventoryManager.settings.wielding.expectedRightId = undefined;
                            client.inventoryManager.expectdUnwield = 'right';
                            break;

                        default:
                            client.inventoryManager.expectdUnwield = 'any';
                            break;
                    }
                }

                client.inventoryManager.save();
            }
        )
    ]
);
