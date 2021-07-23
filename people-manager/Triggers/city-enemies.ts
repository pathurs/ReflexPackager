import { TriggerItem, ExecuteScriptAction, TriggerType } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient, Person } from 'people-manager/people-manager';

declare const client: PeopleManagerClient & SystemServiceClient;

export const cityEnemies = new TriggerItem(
    'City Enemies',
    [
        /^Enemies of the City of ([A-Z][a-z]+):$/,
        /^([\w\W]+)$/,
        /^Total: (\d+)$/
    ],
    TriggerType.MultiLineTrigger,
    [
        new ExecuteScriptAction(
            function (args: MultiLineTriggerFunctionArgs) {
                const cityName = args.matches[0][1].toLowerCase();
                const peopleLine = args.lines[1];

                if ('parsed_line' in peopleLine) {
                    if (peopleLine.line !== 'None') {
                        Object
                            .values<Person>(<{ [name: string]: Person }>client.peopleManager.settings.people)
                            .forEach(person => client.peopleManager.removeEnemyOf(person, cityName));

                        const cityEnemyNames = peopleLine.parsed_line.text().split(', ');

                        cityEnemyNames.forEach(cityEnemyName => {
                            const person = client.peopleManager.getOrCreatePerson(cityEnemyName);

                            if (!client.peopleManager.isEnemyOf(person, cityName)) {
                                client.peopleManager.setEnemyOf(person, cityName);
                                client.peopleManager.updatePerson(person.name, person);
                            }
                        });
                    }
                }
            }
        )
    ]
);
