import { FunctionItem } from '../source';
import { DisplayServiceClient, TableGroupDefinition, TableGroupItemDefinition } from './display-service';

declare const client: DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.displayservice = {
            table(title, groups) {
                const lines: string[] = [];

                displayTableTitle(title);

                groups.forEach(group => {
                    displayTableGroup(group);
                });

                displayTableFooter();

                print(lines.map(line => `<div>${line}</div>`).join(''));

                function getLength(text: string) {
                    return (new DOMParser().parseFromString(text, 'text/html').body.textContent || '').length;
                }

                function displayTableTitle(title: string) {
                    const left = 39 - Math.floor(getLength(title) / 2);
                    const right = 39 - Math.ceil(getLength(title) / 2);

                    lines.push(`+${'-'.repeat(left)}${title}${'-'.repeat(right)}+`);
                }

                function displayTableFooter() {
                    lines.push(`+${'-'.repeat(78)}+`);
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

                    lines.push(`+-${title}${'-'.repeat(right)}-+`);
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
                        const label = item.label.substring(0, columnWidth - getLength(item.value) - labelValueSpacerWidth);
                        const parsed = `${item.label}${' '.repeat(columnWidth - getLength(label) - getLength(item.value))}${item.value}`;

                        if (i !== 0) {
                            line += ' '.repeat(columnSpacerWidth);
                        }

                        line += parsed;
                    }

                    line += ' '.repeat(74 - getLength(line));

                    lines.push(`|   ${line} |`);
                }
            },
            clickify(text, command, hint, fgcolor, bgcolor) {
                return `<a
                    class="url_link"
                    onclick="handle_aliases('${command}')"
                    title="${hint}"
                    style="cursor: pointer; ${fgcolor ? `color: ${fgcolor};` : ''} ${bgcolor ? `background-color: ${bgcolor};` : ''}">${text}</a>`;
            }
        };

        display_notice('Display Service: Loaded.');
    }
);
