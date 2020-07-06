import { ExecuteScriptDefinition } from './execute-script-definition';
import { ActionType } from './action-type';
import { Action } from './action';
import { extractCode } from '../extract-code';

export class ExecuteScriptAction extends Action<ActionType.ExecuteScript> implements ExecuteScriptDefinition {
    public script: string;

    public constructor (code: Function) {
        super(ActionType.ExecuteScript);

        this.script = extractCode(code);
    }
}
