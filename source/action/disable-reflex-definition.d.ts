import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';
import { DisableReflexType } from './disable-reflex-type';

export interface DisableReflexDefinition extends ActionDefinition<ActionType.DisableReflex> {
    type: DisableReflexType;
    name: string;
}
