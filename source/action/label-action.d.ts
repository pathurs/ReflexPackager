import { Action } from './action';
import { ActionType } from './action-type';

export interface LabelAction extends Action<ActionType.Label> {
    "label": ""
}
