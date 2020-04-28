import { GroupItem } from '../../source';
import { shopManagerCreate } from './sm-create';
import { shopManagerDo } from './sm-do';
import { shopManagerRegisterShop } from './sm-register-shop';
import { shopManagerUnregisterShop } from './sm-unregister-shop';

export const Aliases = new GroupItem(
    'Aliases',
    [
        shopManagerCreate,
        shopManagerDo,
        shopManagerRegisterShop,
        shopManagerUnregisterShop
    ]
);
