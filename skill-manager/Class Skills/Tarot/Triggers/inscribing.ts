import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient;

export const inscribing = new MultiTriggerItem(
    'Inscribing',
    [
        /^Wisely preparing yourself beforehand, you lay out the quill and various inks you will need to inscribe the sign of (?:the )?([\w\W]+) into your card\.$/,
        /^Focusing your mind on the task ahead, you block out all extraneous thoughts\.$/,
        /^You take up the quill and begin to trace the outline of (?:the )?([\w\W]+) with careful precision\. The slightest mistake will render the card useless\.$/,
        /^Finishing the outline, you begin to colour (?:the )?([\w\W]+) properly, utilising just the right amount of hue here, the perfect amount of saturation there\.$/
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs) {
                if (client.skillManager.skills.class.tarot.active) {
                    client.skillManager.onAbility('tarot', 'CHANGEME', 'CHANGEME', args);
                }

                if (client.skillManager.skills.class.tarot.inscribing.active) {
                    gag_current_line();
                }
            }
        )
    ]
);
