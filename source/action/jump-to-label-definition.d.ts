import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface JumpToLabelDefinition extends ActionDefinition<ActionType.JumpToLabel> {
    label: string;
}
