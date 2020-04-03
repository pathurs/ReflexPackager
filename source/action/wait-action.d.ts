import { Action } from './action';
import { ActionType } from './action-type';

export interface WaitAction extends Action<ActionType.Wait> {
    seconds: number;
    milliseconds: number;
}
