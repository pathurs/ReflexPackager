import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient } from 'people-manager/people-manager';

declare const client: PeopleManagerClient & SystemServiceClient;

export const honours = new AliasItem(
    'honours',
    /\s*honou?rs\s+([A-Za-z]+)\s*$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs & { 1: string }) {
                client.peopleManager.honoursName = args[1].toLowerCase();

                client.systemService.sendCommand(`honours ${client.peopleManager.honoursName}`, true);

                client.peopleManager.honoursTimerId = <number><unknown>setTimeout(() => {
                    client.peopleManager.honoursName = undefined;
                    client.peopleManager.honoursTimerId = undefined;
                }, 1000);
            }
        )
    ]
);
