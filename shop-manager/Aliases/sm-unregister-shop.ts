import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { ShopManagerClient } from 'shop-manager/shop-manager';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';

declare const client: ShopManagerClient & GMCPServiceClient;

export const shopManagerUnregisterShop = new AliasItem(
    'Shop Manager Unregister Shop',
    /^(?:sm|shop\-manager|shop manager) unregister(?: ?shop)?$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                const room = client.gmcpservice.latest['Room.Info'];

                if (!room) {
                    client.shopmanager.error(`Cannot find room, please %white%look%end% then try again.`);

                    return;
                }

                const index = client.shopmanager.shops.findIndex(value => value.room.num === room.num);

                if (index === -1) {
                    client.shopmanager.error(`Room '%white%${room?.name}%end%' (%white%${room?.num}%end%) is not currently registered as our shop.`);

                    return;
                }

                client.shopmanager.shops.splice(index, 1);

                client.shopmanager.echo(`Unregistered room '%white%${room?.name}%end%' (%white%${room?.num}%end%) as our shop.`);
            }
        )
    ]
);
