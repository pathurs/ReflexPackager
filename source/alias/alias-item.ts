import { Item } from '../item';
import { ItemType } from '../item-type';
import { AliasDefinition } from './alias-definition';
import { AliasType } from './alias-type';
import { Actions } from '../action';

export class AliasItem extends Item<ItemType.Alias> implements AliasDefinition {
    public constructor (
        public text: string,
        public matching: AliasType,
        actions: Actions,
        public whole_words: boolean = true,
        public case_sensitive: boolean = true,
        public prefix_suffix: boolean = true,
        name?: string,
        enabled?: boolean
    ) {
        super(ItemType.Alias, undefined, actions, name, enabled);
    }
}
