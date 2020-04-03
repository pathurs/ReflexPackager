import { Action } from './action';
import { ActionType } from './action-type';

export interface ModifyAButtonAction extends Action<ActionType.ModifyAButton> {
    "buttonid": "1",
    "buttonaction": "label",
    "label": "",
    "command": ""
}
