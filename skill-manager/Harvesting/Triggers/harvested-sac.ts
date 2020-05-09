import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const harvestedSac = new TriggerItem(
    'Harvested Sac',
    /^You reach down and expertly pry back the jaws of the dead snake\. Reaching in with your fingers, careful to avoid the sharp fangs, you tear out the two venom sacs\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                if (client.skillmanager.collecting.active) {
                    const amountMatch = args[1] || '';
                    const itemNameMatch = args[2];

                    const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                    if (itemNameMatch in client.skillmanager.harvesting.descriptionDictionary) {
                        const item: string | undefined = client.skillmanager.harvesting.descriptionDictionary[itemNameMatch];

                        if (item) {
                            client.systemservice.sendCommand(`inrift ${amount} ${item}`);
                        }
                    }
                }
            }
        )
    ]
);
