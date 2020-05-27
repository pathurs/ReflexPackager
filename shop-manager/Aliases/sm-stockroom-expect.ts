import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerStockroomExpect = new AliasItem(
    'Shop Manager Stockroom Expect',
    /^(?:sm|shop\-manager|shop manager) stockroom expect(?: (totem|eye|eye ?sigil|key|key ?sigil|mono|monolith|monolith ?sigil|orb|shimmering ?orb))? (\d+)$/,
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

                        client.shopmanager.echo(`Set expected %lightgray%totem%end% in stockroom of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'eye':
                    case 'eyesigil':
                    case 'eye sigil':
                        currentShop.stockroom.expectedEyeSigilId = id;

                        client.shopmanager.echo(`Set expected %lightgray%eye sigil%end% in stockroom of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'key':
                    case 'keysigil':
                    case 'key sigil':
                        currentShop.stockroom.expectedKeySigilId = id;

                        client.shopmanager.echo(`Set expected %lightgray%key sigil%end% in stockroom of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'mono':
                    case 'monolith':
                    case 'monolithsigil':
                    case 'monolith sigil':
                        currentShop.stockroom.expectedMonolithSigilId = id;

                        client.shopmanager.echo(`Set expected %lightgray%monolith sigil%end% in stockroom of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'orb':
                    case 'shimmeringorb':
                    case 'shimmering orb':
                        currentShop.stockroom.expectedShimmeringOrbId = id;

                        client.shopmanager.echo(`Set expected %lightgray%shimmering orb%end% in stockroom of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case undefined:
                        if (currentShop.stockroom.expectedItemIds.includes(id)) {
                            client.shopmanager.error(`Already expecting item '%lightgray%${id}%end%' in stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`)

                            return;
                        }

                        currentShop.stockroom.expectedItemIds.push(id);

                        client.shopmanager.echo(`Added expected item '%lightgray%totem%end%' in stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
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
