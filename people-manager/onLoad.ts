import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient } from './people-manager';

declare const client: PeopleManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.peoplemanager = {
            settings: get_variable('people-manager:settings') || {
                enabled: true
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%People Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.peoplemanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('people-manager', () => {
                    set_variable('people-manager:settings', client.peoplemanager.settings);

                    client.peoplemanager.echo('Settings saved.');
                });
            }
        };

        client.peoplemanager.echo('Loaded.');
    }
);
