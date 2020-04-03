import { ActionType } from './action-type';

export interface Action<T extends ActionType> {
    type: T;
}
