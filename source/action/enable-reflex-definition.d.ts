import { ActionDefinition } from './action-definition';
import { ActionType } from './action-type';
import { EnableReflexType } from './enable-reflex-type';

export interface EnableReflexDefinition extends ActionDefinition<ActionType.EnableReflex> {
    type: EnableReflexType;
    name: string;
}
