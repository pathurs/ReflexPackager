import { Item } from '../item';
import { ItemType } from '../item-type';
import { AliasDefinition } from './alias-definition';
import { AliasType } from './alias-type';
import { Actions } from '../action';

export class AliasItem extends Item<ItemType.Alias> implements AliasDefinition {
    public text: string;

    public constructor (
        name: string | undefined,
        text: string,
        matching: AliasType,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        prefix_suffix?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: RegExp,
        matching: AliasType,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        prefix_suffix?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: string | RegExp,
        public matching: AliasType,
        actions: Actions,
        public whole_words: boolean = true,
        public case_sensitive: boolean = true,
        public prefix_suffix: boolean = true,
        enabled?: boolean
    ) {
        super(ItemType.Alias, undefined, actions, name, enabled);

        this.text = typeof text === 'string' ? text : text.source;
    }
}
