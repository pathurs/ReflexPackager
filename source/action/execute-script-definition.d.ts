import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface ExecuteScriptDefinition extends ActionDefinition<ActionType.ExecuteScript> {
    script: string;
}
