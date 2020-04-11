import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';

export const config = new AliasItem(
    '^(?:im|inventory\\-manager|inventory manager)( [\\w\\W]+)?',
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1?: string }) {
                run_function('inventory-manager:config', args[1]?.trim().split(' ') || '', 'Inventory Manager');
            }
        )
    ]
);
