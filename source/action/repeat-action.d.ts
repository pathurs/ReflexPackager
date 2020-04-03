import { Action } from './action';
import { ActionType } from './action-type';

export interface RepeatAction extends Action<ActionType.Repeat> {
    "label": "",
    "mode": "count",
    "cond-type1": "value",
    "cond-val1": "",
    "cond-type2": "value",
    "cond-val2": "",
    "cond-op": "eq",
    "cond-mod": "",
    "cond-cs": false,
    "counttype": "value",
    "count": ""
}
