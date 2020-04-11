import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface SendANoticeDefinition extends ActionDefinition<ActionType.ShowANotice> {
    notice: string;
    notice_fg: string;
    notice_bg: string;
}
