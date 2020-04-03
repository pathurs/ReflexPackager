import { Action } from './action';
import { ActionType } from './action-type';

export interface WaitForAction extends Action<ActionType.WaitFor> {
    text: string;
    matching: 'substring';
    whole_words: boolean;
    case_sensitive: boolean;
    expire: 10;
}
