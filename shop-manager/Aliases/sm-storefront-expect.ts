import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerStorefrontExpect = new AliasItem(
    'Shop Manager Storefront Expect',
    /^(?:sm|shop\-manager|shop manager) storefront expect(?: (totem|eye|eye ?sigil|key|key ?sigil|mono|monolith|monolith ?sigil))? (\d+)$/,
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
                        currentShop.storefront.expectedTotemId = id;

                        client.shopManager.echo(`Set expected %lightgray%totem%end% in storefront of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'eye':
                    case 'eyesigil':
                    case 'eye sigil':
                        currentShop.storefront.expectedEyeSigilId = id;

                        client.shopManager.echo(`Set expected %lightgray%eye sigil%end% in storefront of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'key':
                    case 'keysigil':
                    case 'key sigil':
                        currentShop.storefront.expectedKeySigilId = id;

                        client.shopManager.echo(`Set expected %lightgray%key sigil%end% in storefront of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case 'mono':
                    case 'monolith':
                    case 'monolithsigil':
                    case 'monolith sigil':
                        currentShop.storefront.expectedMonolithSigilId = id;

                        client.shopManager.echo(`Set expected %lightgray%monolith sigil%end% in storefront of shop '%lightgray%${currentShop.room.name}%end%' to '%lightgray%${id}%end%'.`);
                        break;

                    case undefined:
                        if (currentShop.storefront.expectedItemIds.includes(id)) {
                            client.shopManager.error(`Already expecting item '%lightgray%${id}%end%' in storefront of shop '%lightgray%${currentShop.room.name}%end%'.`)

                            return;
                        }

                        currentShop.storefront.expectedItemIds.push(id);

                        client.shopManager.echo(`Added expected item '%lightgray%totem%end%' in storefront of shop '%lightgray%${currentShop.room.name}%end%'.`);
                        break;

                    default:
                        client.shopManager.error(`Invalid expected item '%lightgray%${args[1]}%end%'.`);
                        return;
                }

                client.shopManager.save();
            }
        )
    ]
);
