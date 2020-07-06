import { ItemDefinition } from '../item-definition';
import { ItemType } from '../item-type';
import { TriggerType } from './trigger-type';

export interface TriggerDefinition extends ItemDefinition<ItemType.Trigger | ItemType.Group> {
    matching: TriggerType;
    whole_words: boolean;
    case_sensitive: boolean;
    text: string;
}
