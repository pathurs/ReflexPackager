import { GroupItem } from '../../source';
import { shopManagerBinName } from './sm-bin-name';
import { shopManagerEditBinVisibility } from './sm-bin-visibility';
import { shopManagerDo } from './sm-do';
import { shopManagerPolicyAdd } from './sm-policy-add';
import { shopManagerPolicyRemove } from './sm-policy-remove';
import { shopManagerShopRegister } from './sm-shop-register';
import { shopManagerShopUnregister } from './sm-shop-unregister';
import { shopManagerStockroomExpect } from './sm-stockroom-expect';
import { shopManagerStorefrontExpect } from './sm-storefront-expect';

export const Aliases = new GroupItem(
    'Aliases',
    [
        shopManagerBinName,
        shopManagerEditBinVisibility,
        shopManagerDo,
        shopManagerPolicyAdd,
        shopManagerPolicyRemove,
        shopManagerShopRegister,
        shopManagerShopUnregister,
        shopManagerStockroomExpect,
        shopManagerStorefrontExpect
    ]
);
