import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface ModifyAButtonDefinition extends ActionDefinition<ActionType.ModifyAButton> {
    buttonid: unknown;
    buttonaction: unknown;
    label: unknown;
    command: unknown;
}
