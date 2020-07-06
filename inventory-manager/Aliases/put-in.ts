import { AliasItem, AliasType } from '../../source';

export const putIn = new AliasItem(
    'Put In',
    /^put ([\w\W]+?) in ([\w\W]+?)$/,
    AliasType.RegularExpression,
    [
        // new ExecuteScriptAction(
        //     function (args: TriggerFunctionArgs) {
        //         client.systemService.sendCommand(args[0], 1);
        //     }
        // )
    ]
);
