import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface RepeatDefinition extends ActionDefinition<ActionType.Repeat> {
    label: unknown;
    mode: unknown;
    'cond-type1': unknown;
    'cond-val1': unknown;
    'cond-type2': unknown;
    'cond-val2': unknown;
    'cond-op': unknown;
    'cond-mod': unknown;
    'cond-cs': unknown;
    counttype: unknown;
    count: unknown;
}
