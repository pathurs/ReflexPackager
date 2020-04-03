import { ItemType } from './item-type';
import { Action } from './action/action';
import { ActionType } from './action/action-type';

export interface ItemDefinition<T extends ItemType> {
    type: T,
    name: string;
    enabled: boolean;
    id: number;
    actions?: Action<ActionType>[];
    items?: ItemDefinition<ItemType>[];
}
