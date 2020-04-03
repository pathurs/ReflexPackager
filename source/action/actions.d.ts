import { CallFunctionAction } from './call-function-action';
import { DesktopNotificationAction } from './desktop-notification-action';
import { DisableReflexAction } from './disable-reflex-action';
import { DisableThisReflexAction } from './disable-this-reflex-action';
import { EnableReflexAction } from './enable-reflex-action';
import { ExecuteScriptAction } from './execute-script-action';
import { IfAction } from './if-action';
import { JumpToLabelAction } from './jump-to-label-action';
import { LabelAction } from './label-action';
import { ModifyAButtonAction } from './modify-a-button-action';
import { ModifyVariableAction } from './modify-variable-action';
import { PlayASoundAction } from './play-a-sound';
import { RepeatAction } from './repeat-action';
import { SendACommandAction } from './send-a-command-action';
import { SendANoticeAction } from './send-a-notice-action';
import { StopAction } from './stop-action';
import { WaitAction } from './wait-action';
import { WaitForAction } from './wait-for-action';

export type Actions = (
    | CallFunctionAction
    | DesktopNotificationAction
    | DisableReflexAction
    | DisableThisReflexAction
    | EnableReflexAction
    | ExecuteScriptAction
    | IfAction
    | JumpToLabelAction
    | LabelAction
    | ModifyAButtonAction
    | ModifyVariableAction
    | PlayASoundAction
    | RepeatAction
    | SendACommandAction
    | SendANoticeAction
    | StopAction
    | WaitAction
    | WaitForAction
)[];
