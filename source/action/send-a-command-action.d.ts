import { Action } from './action';
import { ActionType } from './action-type';

export interface SendACommandAction extends Action<ActionType.SendACommand> {
    command: string;
    prefix_suffix: boolean;
}
