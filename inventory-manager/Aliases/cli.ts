import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';

export const cli = new AliasItem(
    'cli',
    /^(?:im|inventory\-manager|inventory manager) ([\w\W]+)?/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1?: string }) {
                run_function('inventory-manager:cli', args[1]?.trim().split(' ') || '', 'Inventory Manager');
            }
        )
    ]
);
