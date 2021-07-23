import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { PeopleManagerClient } from './people-manager';

declare const client: PeopleManagerClient & DisplayServiceClient & SystemServiceClient;

export const onBlock = new FunctionItem(
    'onBlock',
    function () {
        current_block.forEach(line => {
            if ('parsed_line' in line) {
                let foreGroundColour = 'reset';
                let backGroundColour = '';

                for (let i = 0; i < line.parsed_line.chunks.length; i++) {
                    const currentChunk = line.parsed_line.chunks[i];

                    switch (currentChunk.type()) {
                        case 'color':
                            if (currentChunk._fg) {
                                foreGroundColour = currentChunk._fg;
                            }

                            if (currentChunk._bg) {
                                backGroundColour = currentChunk._bg;
                            }
                            break;

                        case 'text':
                            {
                                const nameRegExp = /([A-Z][a-z]+)/g;
                                const letterRegExp = /[A-Za-z]/;

                                let text = currentChunk.text();

                                let match: RegExpExecArray | null = null;

                                while (match = nameRegExp.exec(text)) {
                                    const person = client.peopleManager.settings.people[match[1].toLowerCase()];

                                    if (person) {
                                        const end = nameRegExp.lastIndex;
                                        const start = end - person.name.length;

                                        if (start - 1 >= 0 && letterRegExp.test(text[start - 1])) {
                                            continue;
                                        }

                                        if (end <= text.length - 1 && letterRegExp.test(text[end])) {
                                            continue;
                                        }

                                        const colour = client.peopleManager.getColour(person);
                                        const name = client.peopleManager.displayify(person.name);
                                        const tag = client.peopleManager.getTag(person);
                                        const isEnemy = client.peopleManager.isEnemy(person);
                                        const enemyColour = client.peopleManager.getEnemyColour(person);

                                        const chunks: NexusLineChunk[] = [];

                                        chunks.push(linechunk_text(text.slice(0, start)));

                                        if (isEnemy) {
                                            chunks.push(linechunk_color(enemyColour, undefined));
                                            chunks.push(linechunk_text('['));
                                            chunks.push(linechunk_color(foreGroundColour, undefined));
                                            chunks.push(linechunk_color(undefined, backGroundColour));
                                        }

                                        chunks.push(linechunk_mxp_send(colour, [`HONOURS ${name}`], name, `${name}${tag}`, false));

                                        if (isEnemy) {
                                            chunks.push(linechunk_color(enemyColour, undefined));
                                            chunks.push(linechunk_text(']'));
                                            chunks.push(linechunk_color(foreGroundColour, undefined));
                                            chunks.push(linechunk_color(undefined, backGroundColour));
                                        }

                                        chunks.push(linechunk_text(text.slice(end)));

                                        line.parsed_line.chunks.splice(i, 1, ...chunks);

                                        i += chunks.length - 2; // Add length of chunks so we move to the new text chunk we made (the i++ in the for() is added too)

                                        break;
                                    }
                                }
                            }
                            break;
                    }
                }
            }
        })
    }
);
