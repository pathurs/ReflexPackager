import { TriggerItem, TriggerType, ExecuteScriptAction } from '../../../../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { PeopleManagerClient } from 'people-manager/people-manager';

declare const client: SkillManagerClient & SystemServiceClient & GMCPServiceClient & PeopleManagerClient;

export const entered = new TriggerItem(
    'Entered',
    /^([A-Z][a-z]+) has entered the area\.$/,
    TriggerType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string }) {
                if (client.skillManager.skills.class.pranks.active) {
                    client.skillManager.onAbility('telepathy', 'mindnet', 'mindnet', ['entered'], args);

                    const person = client.peopleManager.getPerson(args[1]);
                    const area = client.gmcpService.room.area;

                    // MOVE ME
                    if (person && client.peopleManager.isCityEnemy(person)) {
                        client.systemService.sendCommand(`pt Sensed City Enemy ${client.peopleManager.displayify(person.name)} has entered '${area}'`);

                        if (client.peopleManager.you && client.peopleManager.you.city && client.peopleManager.you.city.toLowerCase() === area.toLowerCase()) {
                            client.systemService.sendCommand(`armytell Sensed City Enemy ${client.peopleManager.displayify(person.name)} has entered '${area}'`);
                        }
                    }
                }
            }
        )
    ]
);



