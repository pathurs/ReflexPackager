import { FunctionItem } from '../../source';

export const config = new FunctionItem(
    'inventory-manager:config',
    function (args: string[]) {
        switch (args[0]) {
            case undefined:
            case 'show':
                run_function('inventory-manager:show', args.slice(1), 'Inventory Manager');
                break;

            case 'help':
            default:
                break;

            case 'pack':
            case 'packs':
            case 'container':
            case 'containers':
                run_function('inventory-manager:containers', args.slice(1) || '', 'Inventory Manager');
                break;
        }
    }
);
