import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerStorefrontUnexpect = new AliasItem(
    'Shop Manager Storefront Unexpect',
    /^(?:sm|shop\-manager|shop manager) storefront unexpect (totem|eye|eye ?sigil|key|key ?sigil|mono|monolith|monolith ?sigil|\d+)$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: TriggerFunctionArgs & { 1: string | undefined, 2: string }) {
                const currentShop = client.shopManager.getCurrentShop();

                if (!currentShop) {
                    client.shopManager.error(`You are not currently standing in an active shop.`);

                    return;
                }

                const id = args[2];

                switch (args[1]) {
                    case 'totem':
                        currentShop.storefront.expectedTotemId = undefined;

                        client.shopManager.echo(`Removed expected %lightgray%totem%end% from storefront of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'eye':
                    case 'eyesigil':
                    case 'eye sigil':
                        currentShop.storefront.expectedEyeSigilId = undefined;

                        client.shopManager.echo(`Removed expected %lightgray%eye sigil%end% from storefront of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'key':
                    case 'keysigil':
                    case 'key sigil':
                        currentShop.storefront.expectedKeySigilId = undefined;

                        client.shopManager.echo(`Removed expected %lightgray%key sigil%end% from storefront of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    case 'mono':
                    case 'monolith':
                    case 'monolithsigil':
                    case 'monolith sigil':
                        currentShop.storefront.expectedMonolithSigilId = undefined;

                        client.shopManager.echo(`Removed expected %lightgray%monolith sigil%end% from storefront of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    default:
                        const index = currentShop.storefront.expectedItemIds.indexOf(id);

                        if (index === -1) {
                            client.shopManager.error(`Was not expecting item '%lightgray%${id}%end%' in storefront of shop '%lightgray%${currentShop.room.name}%end%'.`)

                            return;
                        }

                        currentShop.storefront.expectedItemIds.splice(index, 1);

                        client.shopManager.echo(`Removed expected item '%lightgray%${id}%end%' from storefront of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;
                }

                client.shopManager.save();
            }
        )
    ]
);
