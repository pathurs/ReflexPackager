import { Item } from '../item';
import { ItemType } from '../item-type';
import { Actions } from '../action';
import { KeybindDefinition } from './keybind-definition';

export class KeybindItem extends Item<ItemType.Keybind> implements KeybindDefinition {
    public constructor (
        public key: number,
        public key_alt: boolean = false,
        public key_ctrl: boolean = false,
        public key_shift: boolean = false,
        actions: Actions = [],
        enabled?: boolean
    ) {
        super(ItemType.Keybind, undefined, actions, undefined, enabled);
    }
}
