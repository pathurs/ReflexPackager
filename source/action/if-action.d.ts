import { Action } from './action';
import { ActionType } from './action-type';

export interface IfAction extends Action<ActionType.If> {
    "cond-type1": "value",
    "cond-val1": "",
    "cond-type2": "value",
    "cond-val2": "",
    "cond-op": "eq",
    "cond-mod": "",
    "cond-cs": false,
    "dothen": "continue",
    "doelse": "continue",
    "dothenlabel": "",
    "doelselabel": ""
}
