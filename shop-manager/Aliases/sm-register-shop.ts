import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerRegisterShop = new AliasItem(
    'Shop Manager Register Shop',
    /^(?:sm|shop\-manager|shop manager) register(?: ?shop)?$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                const room = client.gmcpservice.latest['Room.Info'];

                if (!room) {
                    client.shopmanager.error(`Cannot find room, please %white%look%end% then try again.`);

                    return;
                }

                const currentShop = client.shopmanager.shops.find(value => value.room.num === room.num);

                if (currentShop) {
                    client.shopmanager.error(`Room '%white%${room?.name}%end%' (%white%${room?.num}%end%) is already registered as our shop.`);

                    return;
                }

                client.shopmanager.shops.push({
                    room,
                    storefront: {
                        items: [],
                        expectedOther: []
                    },
                    stockroom: {
                        items: [],
                        expectedOther: []
                    }
                });

                client.shopmanager.echo(`Registered room '%white%${room?.name}%end%' (%white%${room?.num}%end%) as our shop.`);
            }
        )
    ]
);
