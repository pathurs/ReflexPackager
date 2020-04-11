import { ActionType } from './action-type';

export interface ActionDefinition<T extends ActionType> {
    action: T;
}
