import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';
import { WaitForType } from './wait-for-type';

export interface WaitForDefinition extends ActionDefinition<ActionType.WaitFor> {
    text: string;
    matching: WaitForType;
    whole_words: boolean;
    case_sensitive: boolean;
    expire: number;
}
