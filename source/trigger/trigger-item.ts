import { TriggerDefinition } from './trigger-definition';
import { Item } from '../item';
import { ItemType } from '../item-type';
import { TriggerType } from './trigger-type';
import { Actions, ActionType } from '../action';

export class TriggerItem extends Item<ItemType.Trigger | ItemType.Group> implements TriggerDefinition {
    public text: string;
    public type: ItemType.Trigger | ItemType.Group = this.matching === TriggerType.MultiTrigger ? ItemType.Group : ItemType.Trigger;

    public constructor (
        name: string | undefined,
        text: string,
        matching: TriggerType.BeginsWith | TriggerType.Contains | TriggerType.ExactMatch,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: RegExp,
        matching: TriggerType.RegularExpression,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: RegExp[],
        matching: TriggerType.MultiTrigger,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        text: RegExp[],
        matching: TriggerType.MultiLineTrigger,
        actions: Actions,
        whole_words?: boolean,
        case_sensitive?: boolean,
        enabled?: boolean
    );
    public constructor (
        name: string | undefined,
        textOrRegExpOrRegExpArray: string | RegExp | RegExp[],
        public matching: TriggerType,
        actions: Actions,
        public whole_words: boolean = false,
        public case_sensitive: boolean = false,
        enabled?: boolean
    ) {
        super(ItemType.Trigger, undefined, actions, name, enabled);

        switch (matching) {
            case TriggerType.BeginsWith:
            case TriggerType.Contains:
            case TriggerType.ExactMatch:
                if (typeof textOrRegExpOrRegExpArray !== 'string') {
                    throw new Error(`Trigger Type '${matching}' requires a string.`);
                }

                this.text = textOrRegExpOrRegExpArray;
                this.type = ItemType.Trigger;
                break;

            case TriggerType.RegularExpression:
                if (!(textOrRegExpOrRegExpArray instanceof RegExp)) {
                    throw new Error(`Trigger Type '${matching}' requires a RegExp`);
                }

                this.text = textOrRegExpOrRegExpArray.source;
                this.type = ItemType.Trigger;
                break;

            case TriggerType.MultiTrigger:
                if (!(textOrRegExpOrRegExpArray instanceof Array)) {
                    throw new Error(`Trigger Type '${matching}' requires a RegExp`);
                }

                this.text = '';
                this.items = textOrRegExpOrRegExpArray.map((regExp, index) => {
                    return new TriggerItem(
                        `${name}:${index}`,
                        regExp,
                        TriggerType.RegularExpression,
                        actions,
                        whole_words,
                        case_sensitive,
                        enabled
                    );
                })
                break;

            case TriggerType.MultiLineTrigger:
                if (!(textOrRegExpOrRegExpArray instanceof Array)) {
                    throw new Error(`Trigger Type '${matching}' requires an array of RegExp`);
                }

                this.text = textOrRegExpOrRegExpArray[0].source;
                this.matching = TriggerType.RegularExpression;
                this.actions = actions.map(action => {
                    if (action.action !== ActionType.ExecuteScript) {
                        throw new Error(`Can not currently run action type '${action.action}' in a Multi-line trigger.`)
                    }

                    return {
                        action: ActionType.ExecuteScript,
                        script: `
    var regExpArray = [
        ${textOrRegExpOrRegExpArray.join(',\n    ')}
    ];

    var indexOffset = current_block.indexOf(current_line);
    var lastIndex =  indexOffset + regExpArray.length - 1;

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

    for (let i = 0; i < regExpArray.length; i++) {
        const lineIndex = i + indexOffset;

        if (!current_block[lineIndex] || !current_block[lineIndex].parsed_line) {
            break;
        }

        var currentRegExp = regExpArray[i];
        var currentText = current_block[lineIndex].parsed_line.text();

        if (!currentRegExp.test(currentText)) {
            break;
        }

        args.matches.push(currentText.match(currentRegExp));
        args.lines.push(current_block[lineIndex]);

        if (lineIndex === lastIndex) {
            ${action.script}
        }
    }
    `
                    };
                });
                break;

            default:
                throw new Error(`Unknown Trigger Type '${matching}'`);
        }
    }
}
