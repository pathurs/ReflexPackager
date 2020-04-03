import { AliasDefinition } from './alias';
import { EventDefinition } from './event';
import { FunctionDefinition } from './function';
import { GroupDefinition } from './group';
import { KeybindDefinition } from './keybind';
import { TriggerDefinition } from './trigger';


export type Items = (AliasDefinition | EventDefinition | FunctionDefinition | GroupDefinition | KeybindDefinition | TriggerDefinition)[];
