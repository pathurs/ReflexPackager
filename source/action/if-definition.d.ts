import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface IfDefinition extends ActionDefinition<ActionType.If> {
    'cond-type1': unknown;
    'cond-val1': unknown;
    'cond-type2': unknown;
    'cond-val2': unknown;
    'cond-op': unknown;
    'cond-mod': unknown;
    'cond-cs': unknown;
    dothen: unknown;
    doelse: unknown;
    dothenlabel: unknown;
    doelselabel: unknown;
}
