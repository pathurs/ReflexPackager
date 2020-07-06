import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient } from './people-manager';

declare const client: PeopleManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.peopleManager = {
            settings: client.systemService.defaultsDeep(get_variable('people-manager:settings'), {
                enabled: true
            }),
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%People Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.peopleManager.echo(`%red%${text}%end%`);
            },
            save() {
                client.systemService.save('people-manager', () => {
                    set_variable('people-manager:settings', client.peopleManager.settings);

                    client.peopleManager.echo('Settings saved.');
                });
            }
        };

        client.peopleManager.echo('Loaded.');
    }
);
