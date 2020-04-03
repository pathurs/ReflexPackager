import { ItemType } from '../item-type';
import { FunctionDefinition } from './function-definition';
import { Item } from '../item';

export class FunctionItem extends Item<ItemType.Function> implements FunctionDefinition {
    public constructor (name: string, public code: string, enabled?: boolean) {
        super(ItemType.Function, undefined, undefined, name, enabled);
    }
}
