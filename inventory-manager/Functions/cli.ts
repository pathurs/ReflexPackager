import { FunctionItem } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';

declare const client: InventoryManagerClient;

export const cli = new FunctionItem(
    'inventory-manager:cli',
    function (args: string[]) {
        switch (args[0]) {
            case undefined:
            case 'show':
                run_function('inventory-manager:cli-show', args.slice(1), 'Inventory Manager');
                break;

            case 'config':
                if (args.length === 1) {
                    run_function('inventory-manager:cli-show', args.slice(1), 'Inventory Manager');
                }
                else {
                    switch (args[1]) {
                        case 'enabled':
                            switch (args[2]) {
                                case 'true':
                                case 'yes':
                                case '1':
                                    client.inventoryManager.settings.enabled = true;

                                    client.inventoryManager.echo(`%lime%Enabled%end%.`);
                                    break;

                                case 'false':
                                case 'no':
                                case '0':
                                    client.inventoryManager.settings.enabled = false;

                                    client.inventoryManager.echo(`%red%Disabled%end%.`);
                                    break;

                                default:
                                    client.inventoryManager.error(`Could not parse value '${args[2]}'.`);
                            }
                            break;

                        default:
                            client.inventoryManager.error(`Unknown config setting '${args[1]}'.`);
                    }
                }
                break;

            case 'help':
            default:
                break;

            case 'pack':
            case 'packs':
            case 'container':
            case 'containers':
                run_function('inventory-manager:cli-containers', args.slice(1) || '', 'Inventory Manager');
                break;
        }
    }
);
