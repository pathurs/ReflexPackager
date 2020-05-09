import { FunctionItem } from '../source';
import { DisplayServiceClient, TableGroupDefinition, TableGroupItemDefinition } from './display-service';

declare const client: DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.displayservice = {
            echo(text: string) {
                ow_Write('#output_main', client.displayservice.colorify(text));
            },
            color(text: string, color: string) {
                return `<span style="color: ${color};">${text}</span>`;
            },
            table(title, groups) {
                const lines: string[] = [];

                displayTableTitle(title);

                groups.forEach(group => {
                    displayTableGroup(group);
                });

                displayTableFooter();

                client.displayservice.echo(lines.map(line => `<div>${line}</div>`).join(''));

                function displayTableTitle(title: string) {
                    const left = 39 - Math.floor(client.displayservice.getLength(title) / 2);
                    const right = 39 - Math.ceil(client.displayservice.getLength(title) / 2);

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
                    const right = 76 - client.displayservice.getLength(title);

                    lines.push(`+-${title}${safeRepeat('-', right)}-+`);
                }

                function displayTableGroupItems(items: TableGroupItemDefinition[], columns: 1 | 2 | 3 | 4) {
                    let columnWidth: number;
                    const labelValueSpacerWidth = 1;
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
                        const label = item.label.substring(0, columnWidth - client.displayservice.getLength(item.value) - labelValueSpacerWidth);
                        const parsed = `${item.label}${safeRepeat(' ', columnWidth - client.displayservice.getLength(label) - client.displayservice.getLength(item.value))}${item.value}`;

                        if (i !== 0) {
                            line += safeRepeat(' ', columnSpacerWidth);
                        }

                        line += parsed;
                    }

                    line += safeRepeat(' ', 74 - client.displayservice.getLength(line));

                    lines.push(`|   ${line} |`);
                }
            },
            colorify(message: string) {
                let result = message;

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
            commandify(text, command, hint) {
                return client.displayservice.clickify(
                    text,
                    `handle_aliases('${command}')`,
                    hint
                );
            },
            clickify(text, code, hint) {
                const anchorTag = $(`<a>${client.displayservice.colorify(text)}</a>`);

                anchorTag.attr('onclick', code + ';return false;');
                anchorTag.attr('title', hint);
                anchorTag.attr('style', 'cursor: pointer; text-decoration: underline;')

                return anchorTag.prop('outerHTML');
            },
            getLength(text: string) {
                return $($.parseHTML(text)).text().length;
            }
        };

        function safeRepeat(text: string, count: number): string {
            return text.repeat(Math.max(count, 0));
        }

        client.displayservice.echo('%lightgray%[%deepskyblue%Display Service%end%]:%end% Loaded.');
    }
);
