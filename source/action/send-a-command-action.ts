import { Action } from './action';
import { ActionType } from './action-type';
import { SendACommandDefinition } from './send-a-command-definition';

export class SendACommandAction extends Action<ActionType.SendACommand> implements SendACommandDefinition {
    public constructor (public command: string, public prefix_suffix: boolean = true) {
        super(ActionType.SendACommand);
    }
}
