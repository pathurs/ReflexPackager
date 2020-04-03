import { ItemType } from '../item-type';
import { ItemDefinition } from '../item-definition';
import { AliasType } from './alias-type';

export interface AliasDefinition extends ItemDefinition<ItemType.Alias> {
    matching: AliasType;
    whole_words: boolean;
    case_sensitive: boolean;
    prefix_suffix: boolean;
    text: string;
}
