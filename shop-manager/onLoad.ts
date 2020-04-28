import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SystemServiceClient } from 'system-service/system-service';
import { ShopManagerClient } from './shop-manager';

declare const client: ShopManagerClient & DisplayServiceClient & GMCPServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.shopmanager = {
            enabled: true,
            shops: get_variable('shop-manager:shops') || [],
            echo(text) {
                client.displayservice.echo(`%white%[%deepskyblue%Shop Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.shopmanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('shop-manager', () => {
                    set_variable('shop-manager:shops', client.shopmanager.shops);

                    client.shopmanager.echo('Settings saved.');
                });
            }
        };

        client.shopmanager.echo('Loaded.');
    }
);
