import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';

export const infoInventory = new AliasItem(
    'Info Inventory (ii)',
    /^ii$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                send_command('ii', 1);
                send_GMCP('Char.Items.Inv');
            }
        )
    ]
);
