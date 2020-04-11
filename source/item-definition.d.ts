import { ItemType } from './item-type';
import { ActionDefinition, ActionType } from './action';

export interface ItemDefinition<T extends ItemType> {
    type: T,
    name: string;
    enabled: boolean;
    id: number;
    actions?: ActionDefinition<ActionType>[];
    items?: ItemDefinition<ItemType>[];
}
