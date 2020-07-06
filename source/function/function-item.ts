import { ItemType } from '../item-type';
import { FunctionDefinition } from './function-definition';
import { Item } from '../item';
import { extractCode } from '../extract-code';

export class FunctionItem extends Item<ItemType.Function> implements FunctionDefinition {
    public code: string;

    public constructor (name: string, code: Function, enabled?: boolean) {
        super(ItemType.Function, undefined, undefined, name, enabled);

        this.code = extractCode(code);
    }
}
