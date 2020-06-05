import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const inscribeClear = new AliasItem(
    'Inscribe Clear',
    /^inscribe clear$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillManager.tarot.inscribing.reset();
                client.skillManager.tarot.inscribing.stop();
            }
        )
    ]
);