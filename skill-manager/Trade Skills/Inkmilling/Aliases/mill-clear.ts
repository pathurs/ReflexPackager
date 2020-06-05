import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const millClear = new AliasItem(
    'Mill Clear',
    /^mill clear$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillManager.inkmilling.reset();
                client.skillManager.inkmilling.stop();
            }
        )
    ]
);
