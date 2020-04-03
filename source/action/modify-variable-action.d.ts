import { Action } from './action';
import { ActionType } from './action-type';

export interface ModifyVariableAction extends Action<ActionType.ModifyVariable> {
    "varname": "",
    "valtype": "value",
    "value": "",
    "op": "set"
}
