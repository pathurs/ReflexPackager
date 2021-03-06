import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface LabelDefinition extends ActionDefinition<ActionType.Label> {
    label: string;
}
