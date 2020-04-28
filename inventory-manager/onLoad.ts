import { FunctionItem } from '../source';
import { InventoryManagerClient } from './inventory-manager';
import { DisplayServiceClient } from '../display-service/display-service';
import { GMCPServiceClient } from '../gmcp-service/gmcp-service';
import { SystemServiceClient } from '../system-service/system-service';

declare const client: InventoryManagerClient & DisplayServiceClient & GMCPServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        const enabled: boolean | undefined = get_variable('inventory-manager:enabled');

        client.inventorymanager = {
            enabled: enabled != undefined ? enabled : true,
            items: [],
            wielding: get_variable('inventory-manager:wielding') || {
                enabled: true
            },
            wearables: get_variable('inventory-manager:wearables') || {
                enabled: true,
                expectedIds: []
            },
            groupables: get_variable('inventory-manager:groupables') || {
                enabled: true
            },
            containers: get_variable('inventory-manager:containers') || {
                enabled: true,
                tracked: []
            },
            corpses: get_variable('inventory-manager:corpses') || {
                enabled: true
            },
            echo(text) {
                client.displayservice.echo(`%white%[%deepskyblue%Inventory Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.inventorymanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('inventory-manager', () => {
                    set_variable('inventory-manager:enabled', client.inventorymanager.enabled);
                    set_variable('inventory-manager:wielding', client.inventorymanager.wielding);
                    set_variable('inventory-manager:wearables', client.inventorymanager.wearables);
                    set_variable('inventory-manager:groupables', client.inventorymanager.groupables);
                    set_variable('inventory-manager:containers', client.inventorymanager.containers);
                    set_variable('inventory-manager:corpses', client.inventorymanager.corpses);

                    client.inventorymanager.echo('Settings saved.');
                });
            }
        };

        send_GMCP('Char.Items.Inv');

        client.inventorymanager.containers.tracked.forEach(container => {
            send_GMCP('Char.Items.Contents', Number(container.id));
        });

        client.gmcpservice.subscribe(['Char.Items.List', 'Char.Items.Add', 'Char.Items.Remove', 'Char.Items.Update'], args => {
            if (args.gmcp_args.location === 'inv') {
                run_function('inventory-manager:onInventoryChange', args, 'Inventory Manager');
            }
            else if (args.gmcp_args.location.startsWith('rep')) {
                run_function('inventory-manager:onContentsChange', args, 'Inventory Manager');
            }
        });

        client.inventorymanager.echo('Loaded.');
    }
);
