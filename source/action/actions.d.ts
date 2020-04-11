import { CallFunctionDefinition } from './call-function-definition';
import { DesktopNotificationDefinition } from './desktop-notification-definition';
import { DisableReflexDefinition } from './disable-reflex-definition';
import { DisableThisReflexDefinition } from './disable-this-reflex-definition';
import { EnableReflexDefinition } from './enable-reflex-definition';
import { ExecuteScriptDefinition } from './execute-script-definition';
import { IfDefinition } from './if-definition';
import { JumpToLabelDefinition } from './jump-to-label-definition';
import { LabelDefinition } from './label-definition';
import { ModifyAButtonDefinition } from './modify-a-button-definition';
import { ModifyVariableDefinition } from './modify-variable-definition';
import { PlayASoundDefinition } from './play-a-sound-definition';
import { RepeatDefinition } from './repeat-definition';
import { SendACommandDefinition } from './send-a-command-definition';
import { SendANoticeDefinition } from './send-a-notice-definition';
import { StopDefinition } from './stop-definition';
import { WaitDefinition } from './wait-definition';
import { WaitForDefinition } from './wait-for-definition';

export type Actions = (
    | CallFunctionDefinition
    | DesktopNotificationDefinition
    | DisableReflexDefinition
    | DisableThisReflexDefinition
    | EnableReflexDefinition
    | ExecuteScriptDefinition
    | IfDefinition
    | JumpToLabelDefinition
    | LabelDefinition
    | ModifyAButtonDefinition
    | ModifyVariableDefinition
    | PlayASoundDefinition
    | RepeatDefinition
    | SendACommandDefinition
    | SendANoticeDefinition
    | StopDefinition
    | WaitDefinition
    | WaitForDefinition
)[];
