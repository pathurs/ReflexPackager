import { ItemType } from '../item-type';
import { ItemDefinition } from '../item-definition';

export interface KeybindDefinition extends ItemDefinition<ItemType.Keybind> {
    key: number;
    key_alt: boolean;
    key_ctrl: boolean;
    key_shift: boolean;
}
