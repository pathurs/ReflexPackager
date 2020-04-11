import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const wield = new AliasItem(
    '^wield (?:(left|right) ?)?([\\w\\d]+)$',
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1?: 'left' | 'right'; 2: string }) {
                send_command(args[0], 1);

                switch (args[1]) {
                    case 'left':
                        client.inventorymanager.wielding.expectdWield = 'left';

                        if (client.inventorymanager.wielding.expectedLeftId) {
                            client.inventorymanager.wielding.expectdUnwield = 'left';
                        }
                        break;

                    case 'right':
                        client.inventorymanager.wielding.expectdWield = 'right';

                        if (client.inventorymanager.wielding.expectdRightId) {
                            client.inventorymanager.wielding.expectdUnwield = 'right';
                        }
                        break;

                    default:
                        if (client.inventorymanager.wielding.expectedLeftId && client.inventorymanager.wielding.expectdRightId) {
                            client.inventorymanager.wielding.expectdWield = 'left';
                            client.inventorymanager.wielding.expectdUnwield = 'left';
                        }
                        else if (client.inventorymanager.wielding.expectedLeftId) {
                            client.inventorymanager.wielding.expectdWield = 'right';
                        }
                        else {
                            client.inventorymanager.wielding.expectdWield = 'left';
                        }
                        break;
                }
            }
        )
    ]
);
