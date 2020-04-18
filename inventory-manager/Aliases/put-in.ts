import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';

export const putIn = new AliasItem(
    'Put In',
    /^put ([\w\W]+?) in ([\w\W]+?)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                send_command(args[0], 1);
            }
        )
    ]
);
