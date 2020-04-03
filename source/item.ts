import { ItemType } from './item-type';
import { ItemDefinition } from './item-definition';
import { Items } from './items';
import { Actions } from './action';

export abstract class Item<T extends ItemType> implements ItemDefinition<T> {
    private static nextId = 1;

    private static getID() {
        return ++Item.nextId;
    }

    public readonly id = this.type === ItemType.Package ? 1 : Item.getID();

    public constructor (
        public readonly type: T,
        public readonly items: Items | undefined = undefined,
        public readonly actions: Actions | undefined = undefined,
        public name: string = '',
        public enabled: boolean = true
    ) {
        this.items = this.items || [];
        this.actions = this.actions || [];

        if (this.type === ItemType.Package) {
            // Force Package to be a group
            this.type = <T>ItemType.Group;
        }
    }
}
