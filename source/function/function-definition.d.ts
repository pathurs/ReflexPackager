import { ItemDefinition } from '../item-definition';
import { ItemType } from '../item-type';

export interface FunctionDefinition extends ItemDefinition<ItemType.Function> {
    code: string;
}
