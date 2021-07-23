import { FunctionItem } from '../source';
import { DisplayServiceClient, TableGroupDefinition, TableGroupItemDefinition } from './display-service';

declare const client: DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.displayService = {
            echo(messageOrMessages: string | string[]) {
                if (Array.isArray(messageOrMessages)) {
                    client.displayService.echo(messageOrMessages.map(message => `<div>${message}</div>`).join(''));
                }
                else {
                    ow_Write('#output_main', client.displayService.colorify(messageOrMessages));
                }
            },
            box(message, borderCharacter = '%lightgray%*%end%') {
                const colorifiedBorderCharacter = client.displayService.colorify(borderCharacter);

                if (getLength(colorifiedBorderCharacter) !== 1) {
                    throw new Error(`'borderCharacter' must have a length of 1.`);
                }

                const lines: string[] = [];

                const messageLength = getLength(message);
                const boxWidth = Math.min(messageLength, 76);

                lines.push(safeRepeat(colorifiedBorderCharacter, boxWidth + 4));
                lines.push(`${colorifiedBorderCharacter}${safeRepeat(' ', boxWidth + 2)}${colorifiedBorderCharacter}`);
                lines.push(`${colorifiedBorderCharacter}${center(message, boxWidth + 2, '', ' ')}${colorifiedBorderCharacter}`);
                lines.push(`${colorifiedBorderCharacter}${safeRepeat(' ', boxWidth + 2)}${colorifiedBorderCharacter}`);
                lines.push(safeRepeat(colorifiedBorderCharacter, boxWidth + 4));

                client.displayService.echo(lines);
            },
            table(title, groups) {
                const lines: string[] = [];

                displayTableTitle(title);

                groups.forEach(group => {
                    displayTableGroup(group);
                });

                displayTableFooter();

                client.displayService.echo(lines);

                function displayTableTitle(title: string) {
                    const left = 39 - Math.floor(getLength(title) / 2);
                    const right = 39 - Math.ceil(getLength(title) / 2);

                    lines.push(`+${safeRepeat('-', left)}${title}${safeRepeat('-', right)}+`);
                }

                function displayTableFooter() {
                    lines.push(`+${safeRepeat('-', 78)}+`);
                }

                function displayTableGroup(group: TableGroupDefinition) {
                    if (group.title) {
                        displayTableGroupTitle(group.title);
                    }

                    for (let i = 0; i < group.items.length; i += group.columns) {
                        displayTableGroupItems(group.items.slice(i, i + group.columns), group.columns);
                    }
                }

                function displayTableGroupTitle(title: string) {
                    const right = 76 - getLength(title);

                    lines.push(`+-${title}${safeRepeat('-', right)}-+`);
                }

                function displayTableGroupItems(items: TableGroupItemDefinition[], columns: 1 | 2 | 3 | 4) {
                    let columnWidth: number;
                    const columnSpacerWidth = 3;

                    switch (columns) {
                        case 1:
                            columnWidth = 74;
                            break;

                        case 2:
                            columnWidth = 35;
                            break;

                        case 3:
                            columnWidth = 22;
                            break;

                        case 4:
                            columnWidth = 16;
                            break;

                        default:
                            throw new Error(`Display Service: Unsupported columnss '${columns}'`);
                    }

                    let line = '';

                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        const parsed = `${item.label}${safeRepeat(' ', columnWidth - getLength(item.label) - getLength(item.value))}${item.value}`;

                        if (i !== 0) {
                            line += safeRepeat(' ', columnSpacerWidth);
                        }

                        line += parsed;
                    }

                    line += safeRepeat(' ', 74 - getLength(line));

                    lines.push(`|   ${line} |`);
                }
            },
            color(text: string, color: string) {
                return `<span style="color: ${color};">${text}</span>`;
            },
            colorify(text: string) {
                let result = text;

                const pattern = /%([a-zA-Z]+|#[0-9a-fA-F]{6,6})%/;
                let depth = 0;
                let match;

                while (match = pattern.exec(result)) {
                    let replacement = '';

                    if (match[1] == 'end') {
                        //skip a end at depth 0
                        if (depth > 0) {
                            replacement = '</span>';
                            depth--;
                        }
                    }
                    else {
                        replacement = `<span style="color: ${match[1]};">`;
                        depth++;
                    }

                    result = result.replace(pattern, replacement);
                }

                result += '</span>'.repeat(depth);

                return result;
            },
            rainbowify(text) {
                const rainbow = [
                    '#ff0000',
                    '#ff8800',
                    '#88ff00',
                    '#00ff00',
                    // '#00ff88',
                    '#0088ff',
                    // '#0000ff',
                    '#8800ff',
                    '#ff0088'
                ];

                let result = '';

                for (let i = 0; i < text.length; i++) {
                    const colour = rainbow[i % rainbow.length];
                    const letter = text[i];

                    result += `%${colour}%${letter}%end%`;
                }

                return result;
            },
            commandify(text, command, hint) {
                return client.displayService.clickify(
                    text,
                    `handle_aliases('${command}')`,
                    hint
                );
            },
            clickify(text, code, hint) {
                const anchorTag = $(`<a>${client.displayService.colorify(text)}</a>`);

                anchorTag.attr('onclick', code + ';return false;');
                anchorTag.attr('title', hint);
                anchorTag.attr('style', 'cursor: pointer; text-decoration: underline;')

                return anchorTag.prop('outerHTML');
            }
        };

        function getLength(text: string): number {
            return $($.parseHTML(text)).text().length;
        }

        function safeRepeat(text: string, count: number): string {
            return text.repeat(Math.max(count, 0));
        }

        function center(text: string, width: number, gap: string = '', repeat: string = ' ') {
            if (getLength(repeat) !== 1) {
                throw new Error(`'repeat' must have a length of 1.`);
            }

            const textLength = getLength(text);
            const gapLength = getLength(gap);

            const left = Math.floor(width / 2) - Math.floor(textLength / 2) - gapLength;
            const right = Math.ceil(width / 2) - Math.ceil(textLength / 2) - gapLength;

            return `${safeRepeat(repeat, left)}${gap}${text}${gap}${safeRepeat(repeat, right)}`;
        }

        client.displayService.echo('%lightgray%[%deepskyblue%Display Service%end%]:%end% Loaded.');
    }
);
