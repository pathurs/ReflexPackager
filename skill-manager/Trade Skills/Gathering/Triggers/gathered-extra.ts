import { ExecuteScriptAction, MultiTriggerItem } from '../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const gatheredExtra = new MultiTriggerItem(
    'Gathered Extra',
    [
        /^As you cleanse the clay in the riverwater, you discover (a group of \d+ |an |a |some |\d+ )?([\w\W]+) hidden by the silt\.$/,
        /^With your keen eyes, you spot some additional edibles and you gather (a group of \d+ |an |a |some |\d+ )?([\w\W]+) to supplement your collection\.$/
    ],
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1?: string; 2: string }) {
                if (client.skillManager.collecting.active) {
                    const amountMatch = args[1] || '';
                    const itemNameMatch = args[2];

                    const amount = amountMatch.match(/(\d+)/)?.[1] || '1';

                    if (itemNameMatch in client.skillManager.gathering.descriptionDictionary) {
                        const item: string | undefined = client.skillManager.gathering.descriptionDictionary[itemNameMatch];

                        if (item) {
                            client.systemService.sendCommand(`inrift ${amount} ${item}`);
                        }
                    }
                }
            }
        )
    ]
);



