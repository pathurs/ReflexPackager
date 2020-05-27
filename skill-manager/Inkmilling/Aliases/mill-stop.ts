import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const millStop = new AliasItem(
    'Mill Stop',
    /^mill stop$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillmanager.inkmilling.stop();
            }
        )
    ]
);
