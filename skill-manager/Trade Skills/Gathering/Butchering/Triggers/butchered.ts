import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const butchered = new TriggerItem(
    'Butchered',
    /^Skilfully, you butcher the corpse of [\w\W]+, separating flesh from bone with your cleaver and preparing (a group of \d+ |an |a |some |\d+ )?([\w\W]+)\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                if (client.skillManager.skills.trade.gathering.butchering.running) {
                    const amountMatch = args[1] || '';
                    const itemNameMatch = args[2];

                    const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                    if (itemNameMatch in client.skillManager.skills.trade.gathering.butchering.descriptionDictionary) {
                        const item: string | undefined = client.skillManager.skills.trade.gathering.butchering.descriptionDictionary[itemNameMatch];

                        if (item) {
                            client.systemService.sendCommand(`inrift ${amount} ${item}`);
                        }
                    }
                }
            }
        )
    ]
);



