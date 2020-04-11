import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface SendACommandDefinition extends ActionDefinition<ActionType.SendACommand> {
    command: string;
    prefix_suffix: boolean;
}
