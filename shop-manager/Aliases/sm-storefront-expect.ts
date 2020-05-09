import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerStorefrontExpect = new AliasItem(
    'Shop Manager Storefront Expect',
    /^(?:sm|shop\-manager|shop manager) storefront expect(?: (totem|eye|eye ?sigil|key|key ?sigil|mono|monolith|monolith ?sigil)) ([\w\W]+)$/,
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
                        currentShop.storefront.expectedTotemId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' storefront expected totem to '%lightgray%${id}%end%'.`);
                        break;

                    case 'eye':
                    case 'eyesigil':
                    case 'eye sigil':
                        currentShop.storefront.expectedEyeSigilId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' storefront expected eye sigil to '%lightgray%${id}%end%'.`);
                        break;

                    case 'key':
                    case 'keysigil':
                    case 'key sigil':
                        currentShop.storefront.expectedKeySigilId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' storefront expected key sigil to '%lightgray%${id}%end%'.`);
                        break;

                    case 'mono':
                    case 'monolith':
                    case 'monolithsigil':
                    case 'monolith sigil':
                        currentShop.storefront.expectedMonolithSigilId = id;

                        client.shopmanager.echo(`Set shop '%lightgray%${currentShop.room.name}%end%' storefront expected monolith sigil to '%lightgray%${id}%end%'.`);
                        break;

                    case undefined:
                        if (currentShop.storefront.expectedItemIds.includes(id)) {
                            client.shopmanager.error(`Shop '%lightgray%${currentShop.room.name}%end%' storefront is already expecting item '%lightgray%${id}%end%'.`)

                            return;
                        }

                        currentShop.storefront.expectedItemIds.push(id);

                        client.shopmanager.echo(`Added Shop '%lightgray%${currentShop.room.name}%end%' storefront expected item '%lightgray%${id}%end%'.`);
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
