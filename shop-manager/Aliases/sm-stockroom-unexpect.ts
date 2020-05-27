import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerStockroomUnexpect = new AliasItem(
    'Shop Manager Stockroom Unexpect',
    /^(?:sm|shop\-manager|shop manager) stockroom unexpect (totem|eye|eye ?sigil|key|key ?sigil|mono|monolith|monolith ?sigil|orb|shimmering ?orb|\d+)$/,
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
                        currentShop.stockroom.expectedTotemId = undefined;

                        client.shopmanager.echo(`Removed expected %lightgray%totem%end% from stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'eye':
                    case 'eyesigil':
                    case 'eye sigil':
                        currentShop.stockroom.expectedEyeSigilId = undefined;

                        client.shopmanager.echo(`Removed expected %lightgray%eye sigil%end% from stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'key':
                    case 'keysigil':
                    case 'key sigil':
                        currentShop.stockroom.expectedKeySigilId = undefined;

                        client.shopmanager.echo(`Removed expected %lightgray%key sigil%end% from stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'mono':
                    case 'monolith':
                    case 'monolithsigil':
                    case 'monolith sigil':
                        currentShop.stockroom.expectedMonolithSigilId = undefined;

                        client.shopmanager.echo(`Removed expected %lightgray%monolith sigil%end% from stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'orb':
                    case 'shimmeringorb':
                    case 'shimmering orb':
                        currentShop.stockroom.expectedShimmeringOrbId = undefined;

                        client.shopmanager.echo(`Removed expected %lightgray%shimmering orb%end% from stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    default:
                        const index = currentShop.stockroom.expectedItemIds.indexOf(id);

                        if (index === -1) {
                            client.shopmanager.error(`Was not expecting item '%lightgray%${id}%end%' in stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`)

                            return;
                        }

                        currentShop.stockroom.expectedItemIds.splice(index, 1);

                        client.shopmanager.echo(`Removed expected item '%lightgray%${id}%end%' from stockroom of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;
                }

                client.shopmanager.save();
            }
        )
    ]
);
