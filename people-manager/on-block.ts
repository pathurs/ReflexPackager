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

                for (let i = 0; i < line.parsed_line.chunks.length; i++) {
                    const currentChunk = line.parsed_line.chunks[i];

                    switch (currentChunk.type()) {
                        case 'text':
                            {
                                const regExp = /([A-Z][a-z]+)/g;
                                let text = currentChunk.text();

                                let match: RegExpExecArray | null = null;

                                while (match = regExp.exec(text)) {
                                    const person = client.peopleManager.settings.people[match[1]];

                                    if (person && person.city) {
                                        const chunks: NexusLineChunk[] = [];
                                        const start = regExp.lastIndex - person.name.length;
                                        const end = regExp.lastIndex;
                                        const colour = client.peopleManager.getColour(person.name);

                                        chunks.push(linechunk_text(text.slice(0, start)));
                                        chunks.push(linechunk_mxp_send(colour, [`HONOURS ${person.name}`], person.name, `${person.name} - ${person.city}`, false));
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
