import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const sheathe = new AliasItem(
    'Sheathe',
    /^sheathe (left|right|[\w\d]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: 'left' | 'right' | string }) {
                send_command(args[0], 1);

                const currentLeft = client.inventorymanager.items.find(value => value.attrib?.includes('l'));
                const currentRight = client.inventorymanager.items.find(value => value.attrib?.includes('L'));

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventorymanager.wielding.expectdUnwield = 'both';

                    client.inventorymanager.wielding.expectedLeftId = undefined;
                    client.inventorymanager.wielding.expectdRightId = undefined;
                }
                else {
                    switch (args[1]) {
                        case 'left':
                            client.inventorymanager.wielding.expectedLeftId = undefined;
                            client.inventorymanager.wielding.expectdUnwield = 'left';
                            break;

                        case 'right':
                            client.inventorymanager.wielding.expectdRightId = undefined;
                            client.inventorymanager.wielding.expectdUnwield = 'right';
                            break;

                        default:
                            client.inventorymanager.wielding.expectdUnwield = 'any';
                            break;
                    }
                }

                client.inventorymanager.save();
            }
        )
    ]
);
