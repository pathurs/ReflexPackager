import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';

export const ii = new AliasItem(
    'ii',
    AliasType.ExactMatch,
    [
        new ExecuteScriptAction(
            function () {
                send_command('ii', 1);
                send_GMCP('Char.Items.Inv');
            }
        )
    ]
);
