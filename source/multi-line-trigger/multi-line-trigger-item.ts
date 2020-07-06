import { Item } from '../item';
import { ItemType } from '../item-type';
import { TriggerType } from '../trigger/trigger-type';
import { MultiLineTriggerDefinition } from './multi-line-trigger-definition';
import { Actions, ActionType } from '../action';

export class MultiLineTriggerItem extends Item<ItemType.Trigger> implements MultiLineTriggerDefinition {
    public text: string;
    public matching = TriggerType.RegularExpression;

    public constructor (
        name: string | undefined,
        regExpArray: RegExp[],
        actions: Actions,
        public whole_words: boolean = false,
        public case_sensitive: boolean = false,
        enabled?: boolean
    ) {
        super(
            ItemType.Trigger,
            undefined,
            actions.map(action => {
                if (action.action !== ActionType.ExecuteScript) {
                    throw new Error(`Can not currently run action type '${action.action}' in a Multi-line trigger.`)
                }

                return {
                    action: ActionType.ExecuteScript,
                    script: `
var regExpArray = [
    ${regExpArray.join(',\n    ')}
];

var firstIndex = current_block.indexOf(current_line);
var lastIndex = firstIndex + ${regExpArray.length} - 1;

// Override args
var args = {
    matches: [],
    block: current_block,
    lines: []
};

var prompt = current_block[current_block.length - 1];

if (prompt.parsed_prompt) {
    args.prompt = prompt;
}

for (let i = firstIndex; i <= lastIndex; i++) {
    if (!current_block[i] || !current_block[i].parsed_line) {
        break;
    }

    var currentRegExp = regExpArray[i];
    var currentText = current_block[i].parsed_line.text();

    if (!currentRegExp.test(currentText)) {
        break;
    }

    args.matches.push(currentText.match(currentRegExp));
    args.lines.push(current_block[i]);

    if (i === lastIndex) {
        ${action.script}
    }
}
`
                };
            }),
            name,
            enabled
        );

        if (regExpArray.length === 0) {
            throw new Error('MultiLineTriggerItem requires at least one RegExp.')
        }

        this.text = regExpArray[0].source;
    }
}
