import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const harvested = new TriggerItem(
    'Harvested',
    /^You reach out and carefully harvest (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
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



