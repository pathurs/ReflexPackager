import { GroupItem } from '../../source';
import { shopManagerBinName } from './sm-bin-name';
import { shopManagerBinVisibility } from './sm-bin-visibility';
import { shopManagerDo } from './sm-do';
import { shopManagerPolicyAdd } from './sm-policy-add';
import { shopManagerPolicyRemove } from './sm-policy-remove';
import { shopManagerShopRegister } from './sm-shop-register';
import { shopManagerShopUnregister } from './sm-shop-unregister';
import { shopManagerStockroomExpect } from './sm-stockroom-expect';
import { shopManagerStockroomUnexpect } from './sm-stockroom-unexpect';
import { shopManagerStorefrontExpect } from './sm-storefront-expect';
import { shopManagerStorefrontUnexpect } from './sm-storefront-unexpect';

export const Aliases = new GroupItem(
    'Aliases',
    [
        shopManagerBinName,
        shopManagerBinVisibility,
        shopManagerDo,
        shopManagerPolicyAdd,
        shopManagerPolicyRemove,
        shopManagerShopRegister,
        shopManagerShopUnregister,
        shopManagerStockroomExpect,
        shopManagerStockroomUnexpect,
        shopManagerStorefrontExpect,
        shopManagerStorefrontUnexpect
    ]
);
