import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const wield = new AliasItem(
    'Wield',
    /^wield (?:(left|right) ?)?([\w\d]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1?: 'left' | 'right'; 2: string }) {
                send_command(args[0], 1);

                const currentLeft = client.inventorymanager.items.find(value => value.attrib?.includes('l'));
                const currentRight = client.inventorymanager.items.find(value => value.attrib?.includes('L'));

                switch (args[1]) {
                    case 'left':
                        client.inventorymanager.wielding.expectdWield = 'left';

                        if (currentLeft) {
                            client.inventorymanager.wielding.expectdUnwield = 'left';
                        }
                        break;

                    case 'right':
                        client.inventorymanager.wielding.expectdWield = 'right';

                        if (currentRight) {
                            client.inventorymanager.wielding.expectdUnwield = 'right';
                        }
                        break;

                    default:
                        if (currentLeft && currentRight) {
                            client.inventorymanager.wielding.expectdUnwield = 'left';
                            client.inventorymanager.wielding.expectdWield = 'left';
                        }
                        else if (currentLeft) {
                            client.inventorymanager.wielding.expectdWield = 'right';
                        }
                        else {
                            client.inventorymanager.wielding.expectdWield = 'left';
                        }
                        break;
                }

                if (currentLeft && currentRight && currentLeft === currentRight) {
                    client.inventorymanager.wielding.expectdUnwield = 'both';
                }

                run_function('inventory-manager:save', undefined, 'Inventory Manager');
            }
        )
    ]
);
