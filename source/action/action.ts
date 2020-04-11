import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export class Action<T extends ActionType> implements ActionDefinition<T> {
    public constructor (public readonly action: T) {

    }
}
