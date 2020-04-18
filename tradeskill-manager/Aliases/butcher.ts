import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { TradeskillManagerClient } from '../tradeskill-manager';
import { InventoryManagerClient } from '../../inventory-manager/inventory-manager'

declare const client: TradeskillManagerClient & InventoryManagerClient;

export const butcher = new AliasItem(
    'Butcher',
    /^butcher$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                const corpses = client.inventorymanager.items.filter(value => value.name.startsWith('the corpse of'));

                if (corpses.length > 0) {
                    client.tradeskillmanager.butchering.queue.push('butcher corpse');

                    client.tradeskillmanager.butchering.running = true;

                    run_function('tradeskill-manager:run-queue', undefined, 'Tradeskill Manager');
                }
                else {
                    display_notice(`Tradeskill Manager: You have no corpses.`, '#FF0000');
                }
            }
        )
    ]
);
