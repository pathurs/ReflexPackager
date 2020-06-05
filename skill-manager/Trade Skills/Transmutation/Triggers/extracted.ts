import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const extracted = new TriggerItem(
    'Extracted',
    /^You kneel and collect chunks of earth, using a strong\-smelling solvent to pull (a group of \d+ |an |a |some |\d+ )?([\w\W]+) from the dirt and rock\. This delicate process completed, you set the minerals aside to dry\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                if (client.skillManager.collecting.active) {
                    const amountMatch = args[1] || '';
                    const itemNameMatch = args[2];

                    const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                    if (itemNameMatch in client.skillManager.transmutation.descriptionDictionary) {
                        const item: string | undefined = client.skillManager.transmutation.descriptionDictionary[itemNameMatch];

                        if (item) {
                            client.systemService.sendCommand(`inrift ${amount} ${item}`);
                        }
                    }
                }
            }
        )
    ]
);



