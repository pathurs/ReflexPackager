import { Item } from '../item';
import { ItemType } from '../item-type';
import { TriggerType } from '../trigger/trigger-type';
import { MultiTriggerDefinition } from './multi-trigger-definition';
import { TriggerItem } from '../trigger';
import { Actions } from '../action';

export class MultiTriggerItem extends Item<ItemType.Group> implements MultiTriggerDefinition {
    public matching = TriggerType.RegularExpression;

    public constructor (
        name: string | undefined,
        regExpArray: RegExp[],
        actions: Actions,
        whole_words: boolean = false,
        case_sensitive: boolean = false,
        enabled?: boolean
    ) {
        super(
            ItemType.Group,
            regExpArray.map((regExp, index) => {
                return new TriggerItem(
                    `${name}:${index}`,
                    regExp,
                    TriggerType.RegularExpression,
                    actions,
                    whole_words,
                    case_sensitive,
                    enabled
                );
            }),
            undefined,
            name,
            enabled
        );
    }
}
