import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface WaitDefinition extends ActionDefinition<ActionType.Wait> {
    seconds: number;
    milliseconds: number;
}
