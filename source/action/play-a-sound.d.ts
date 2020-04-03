import { Action } from './action';
import { SoundType } from './sound-type';
import { ActionType } from './action-type';

export interface PlayASoundAction extends Action<ActionType.PlayASound> {
    sound: SoundType;
}
