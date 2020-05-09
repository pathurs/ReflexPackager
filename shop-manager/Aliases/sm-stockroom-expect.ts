import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerStockroomExpect = new AliasItem(
    'Shop Manager Stockroom Expect',
    /^(?:sm|shop\-manager|shop manager) stockroom expect(?: (totem|eye|eye ?sigil|key|key ?sigil|mono|monolith|monolith ?sigil|orb|shimmering ?orb)) ([\w\W]+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string | undefined, 2: string }) {
                const currentShop = client.shopmanager.getCurrentShop();

                if (!currentShop) {
                    client.shopmanager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                const id = args[2];

                switch (args[1]) {
                    case 'totem':
                        currentShop.stockroom.expectedTotemId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' stockroom expected totem to '%lightgray%${id}%end%'.`);
                        break;

                    case 'eye':
                    case 'eyesigil':
                    case 'eye sigil':
                        currentShop.stockroom.expectedEyeSigilId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' stockroom expected eye sigil to '%lightgray%${id}%end%'.`);
                        break;

                    case 'key':
                    case 'keysigil':
                    case 'key sigil':
                        currentShop.stockroom.expectedKeySigilId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' stockroom expected key sigil to '%lightgray%${id}%end%'.`);
                        break;

                    case 'mono':
                    case 'monolith':
                    case 'monolithsigil':
                    case 'monolith sigil':
                        currentShop.stockroom.expectedMonolithSigilId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' stockroom expected monolith sigil to '%lightgray%${id}%end%'.`);
                        break;

                    case 'orb':
                    case 'shimmeringorb':
                    case 'shimmering orb':
                        currentShop.stockroom.expectedShimmeringOrbId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' stockroom expected shimmering orb to '%lightgray%${id}%end%'.`);
                        break;

                    case undefined:
                        if (currentShop.stockroom.expectedItemIds.includes(id)) {
                            client.shopmanager.error(`Shop '%lightgray%${currentShop.room.name}%end%' stockroom is already expecting item '%lightgray%${id}%end%'.`)

                            return;
                        }

                        currentShop.stockroom.expectedItemIds.push(id);

                        client.shopmanager.echo(`Added Shop '%lightgray%${currentShop.room.name}%end%' stockroom expected item '%lightgray%${id}%end%'.`);
                        break;

                    default:
                        client.shopmanager.error(`Invalid expected item '%lightgray%${args[1]}%end%'.`);
                        return;
                }

                client.shopmanager.save();
            }
        )
    ]
);
