import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { SkillManagerClient } from '../../skill-manager';
import { InventoryManagerClient } from '../../../inventory-manager/inventory-manager'

declare const client: SkillManagerClient & InventoryManagerClient;

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
                        client.skillmanager.butchering.itemToRewield = client.inventorymanager.wielding.expectedLeftId;
                    }

                    send_command('wield left cleaver');

                    client.skillmanager.butchering.queue.push('butcher corpse for reagent');

                    client.skillmanager.butchering.running = true;

                    client.skillmanager.runQueue();
                }
                else {
                    client.skillmanager.error(`You have no corpses.`);
                }
            }
        )
    ]
);
