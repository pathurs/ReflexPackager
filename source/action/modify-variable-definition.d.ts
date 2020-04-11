import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';
import { ModifyVariableValueType } from './modify-variable-value-type';
import { ModifyVariableOperation } from './modify-variable-operation';

export interface ModifyVariableDefinition extends ActionDefinition<ActionType.ModifyVariable> {
    varname: string;
    valtype: ModifyVariableValueType;
    value: unknown;
    op: ModifyVariableOperation;
}
