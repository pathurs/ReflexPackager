import { AliasItem, AliasType, ExecuteScriptAction } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const inscribeStop = new AliasItem(
    'Inscribe Stop',
    /^inscribe stop$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                client.skillManager.skills.class.tarot.inscribing.stop();
            }
        )
    ]
);
