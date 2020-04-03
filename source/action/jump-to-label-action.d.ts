import { Action } from './action';
import { ActionType } from './action-type';

export interface JumpToLabelAction extends Action<ActionType.JumpToLabel> {
    "label": ""
}
