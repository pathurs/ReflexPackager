import { ItemDefinition } from '../item-definition';
import { ItemType } from '../item-type';
import { EventType } from './event-type';
import { EventSubtype } from './event-subtype';

export interface EventDefinition extends ItemDefinition<ItemType.Event> {
    evtype: EventType;
    evsubtype: EventSubtype;
}
