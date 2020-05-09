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
                client.systemservice.sendCommand(args[0]);

                const currentLeft = client.gmcpservice.items.inv.find(value => value.attrib?.includes('l'));
                const currentRight = client.gmcpservice.items.inv.find(value => value.attrib?.includes('L'));

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventorymanager.expectdUnwield = 'both';

                    client.inventorymanager.settings.wielding.expectedLeftId = undefined;
                    client.inventorymanager.settings.wielding.expectedRightId = undefined;
                }
                else {
                    switch (args[1]) {
                        case 'left':
                            client.inventorymanager.settings.wielding.expectedLeftId = undefined;
                            client.inventorymanager.expectdUnwield = 'left';
                            break;

                        case 'right':
                            client.inventorymanager.settings.wielding.expectedRightId = undefined;
                            client.inventorymanager.expectdUnwield = 'right';
                            break;

                        default:
                            client.inventorymanager.expectdUnwield = 'any';
                            break;
                    }
                }

                client.inventorymanager.save();
            }
        )
    ]
);
