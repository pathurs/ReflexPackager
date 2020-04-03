import { Item } from '../item';
import { ItemType } from '../item-type';
import { GroupDefinition } from './group-definition';
import { Items } from '../items';

export class Group extends Item<ItemType.Group> implements GroupDefinition {
    public constructor (name: string, items: Items, enabled?: boolean) {
        super(ItemType.Group, items, undefined, name, enabled);
    }
}
