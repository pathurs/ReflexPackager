import { Item } from '../item';
import { ItemType } from '../item-type';
import { PackageDefinition } from './package-definition';
import { Items } from '../items';

export class PackageItem extends Item<ItemType.Group> implements PackageDefinition {
    public constructor (name: string, public description: string, items: Items) {
        super(ItemType.Group, items, undefined, name);
    }
}
