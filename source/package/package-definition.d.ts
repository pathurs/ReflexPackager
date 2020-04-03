import { ItemType } from '../item-type';
import { ItemDefinition } from '../item-definition';

export interface PackageDefinition extends ItemDefinition<ItemType.Package> {
    description: string;
}
