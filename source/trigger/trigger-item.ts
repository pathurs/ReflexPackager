import { TriggerDefinition } from './trigger-definition';
import { Item } from '../item';
import { ItemType } from '../item-type';
import { TriggerType } from './trigger-type';
import { Actions } from '../action';

export class TriggerItem extends Item<ItemType.Trigger> implements TriggerDefinition {
    public text: string;

    public constructor (
        name: string | undefined,
        text: string,
        matching: TriggerType,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: RegExp,
        matching: TriggerType,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: RegExp[],
        matching: TriggerType,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        textOrRegExpOrRegExpArray: string | RegExp | RegExp[],
        public matching: TriggerType,
        actions: Actions,
        public whole_words: boolean = false,
        public case_sensitive: boolean = false,
        enabled?: boolean
    ) {
        super(ItemType.Trigger, undefined, actions, name, enabled);

        if (typeof textOrRegExpOrRegExpArray === 'string') {
            this.text = textOrRegExpOrRegExpArray;
        }
        else if (textOrRegExpOrRegExpArray instanceof RegExp) {
            this.text = textOrRegExpOrRegExpArray.source;
        }
        else {
            this.text = `(?:${textOrRegExpOrRegExpArray.map(regExp => regExp.source).join('|')})`;
        }
    }
}
