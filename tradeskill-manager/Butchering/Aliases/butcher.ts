import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { TradeskillManagerClient } from '../../tradeskill-manager';
import { InventoryManagerClient } from '../../../inventory-manager/inventory-manager'

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
                    if (client.inventorymanager.wielding.expectedLeftId) {
                        client.tradeskillmanager.butchering.itemToRewield = client.inventorymanager.wielding.expectedLeftId;
                    }

                    send_command('wield left cleaver');

                    client.tradeskillmanager.butchering.queue.push('butcher corpse for reagent');

                    client.tradeskillmanager.butchering.running = true;

                    client.tradeskillmanager.runQueue();
                }
                else {
                    client.tradeskillmanager.error(`You have no corpses.`);
                }
            }
        )
    ]
);
