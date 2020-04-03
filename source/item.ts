import { ItemType } from './item-type';
import { ItemDefinition } from './item-definition';
import { Items } from './items';
import { Actions } from './action';

export abstract class Item<T extends ItemType> implements ItemDefinition<T> {
    private static nextId = 1;

    private static getID() {
        return ++Item.nextId;
    }

    public readonly id = Item.getID();

    public constructor (
        public readonly type: T,
        public readonly items: Items | undefined = undefined,
        public readonly actions: Actions | undefined = undefined,
        public name: string = '',
        public enabled: boolean = true
    ) {

    }
}
