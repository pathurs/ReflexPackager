import { AliasItem, AliasType } from '../../source';

export const getFrom = new AliasItem(
    'Get From',
    /^get ([\w\W]+?) from ([\w\W]+?)$/,
    AliasType.RegularExpression,
    [
        // new ExecuteScriptAction(
        //     function (args: TriggerFunctionArgs) {
        //         send_command(args[0], 1);
        //     }
        // )
    ]
);
