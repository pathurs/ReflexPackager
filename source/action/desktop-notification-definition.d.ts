import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';

export interface DesktopNotificationDefinition extends ActionDefinition<ActionType.DesktopNotification> {
    heading: string;
    text: string;
}
