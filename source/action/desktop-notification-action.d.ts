import { Action } from './action';
import { ActionType } from './action-type';

export interface DesktopNotificationAction extends Action<ActionType.DesktopNotification> {
    heading: string;
    text: string;
}
