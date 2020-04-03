import { Item } from '../item';
import { ItemType } from '../item-type';
import { EventDefinition } from './event-definition';
import { Actions } from '../action';
import { EventType } from './event-type';
import { EventSubtype } from './event-subtype';

export class EventItem extends Item<ItemType.Event> implements EventDefinition {
    public constructor (
        public evtype: EventType,
        public evsubtype: EventSubtype,
        actions: Actions,
        enabled?: boolean
    ) {
        super(ItemType.Event, undefined, actions, undefined, enabled);
    }
}
