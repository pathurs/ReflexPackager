import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const unwield = new AliasItem(
    '^unwield (left|right|[\\w\\d]+)$',
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: 'left' | 'right' | string }) {
                send_command(args[0], 1);

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
        )
    ]
);
