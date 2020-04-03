import { TriggerDefinition } from './trigger-definition';
import { Item } from '../item';
import { ItemType } from '../item-type';
import { TriggerType } from './trigger-type';
import { Actions } from '../action';

export class TriggerItem extends Item<ItemType.Trigger> implements TriggerDefinition {
    public constructor (
        public matching: TriggerType,
        public text: string,
        public whole_words: boolean = false,
        public case_sensitive: boolean = false,
        actions: Actions = [],
        enabled?: boolean
    ) {
        super(ItemType.Trigger, undefined, actions, undefined, enabled);
    }
}
