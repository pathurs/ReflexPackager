import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gatheredMilk = new TriggerItem(
    'Gathered Milk',
    /^Spotting a cow whose udder hangs low to the ground, you kneel beside her, gently coaxing her milk into [\w\W]+\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                if (client.skillmanager.collecting.active) {
                    const amountMatch = args[1] || '';
                    const itemNameMatch = args[2];

                    const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                    if (itemNameMatch in client.skillmanager.gathering.descriptionDictionary) {
                        const item: string | undefined = client.skillmanager.gathering.descriptionDictionary[itemNameMatch];

                        if (item) {
                            client.systemservice.sendCommand(`inrift ${amount} ${item}`);
                        }
                    }
                }
            }
        )
    ]
);



