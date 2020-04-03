import { Item } from '../item';
import { ItemType } from '../item-type';
import { PackageDefinition } from './package-definition';
import { Items } from '../items';

export class PackageItem extends Item<ItemType.Package> implements PackageDefinition {
    public constructor (name: string, public description: string, items: Items) {
        super(ItemType.Package, items, undefined, name);
    }
}
