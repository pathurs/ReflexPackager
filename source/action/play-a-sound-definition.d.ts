import { ActionDefinition } from './action-definition';
import { SoundType } from './sound-type';
import { ActionType } from './action-type';

export interface PlayASoundDefinition extends ActionDefinition<ActionType.PlayASound> {
    sound: SoundType;
}
