import { FunctionItem } from '../../source';

export const cli = new FunctionItem(
    'inventory-manager:cli',
    function (args: string[]) {
        switch (args[0]) {
            case undefined:
            case 'show':
            case 'config':
                run_function('inventory-manager:cli-show', args.slice(1), 'Inventory Manager');
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
