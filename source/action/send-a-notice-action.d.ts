import { Action } from './action';
import { ActionType } from './action-type';

export interface SendANoticeAction extends Action<ActionType.ShowANotice> {
    notice: string;
    notice_fg: string;
    notice_bg: string;
}
