import { FunctionItem } from '../source';
import { SystemServiceClient } from './system-service';
import { DisplayServiceClient } from 'display-service/display-service';

declare const client: SystemServiceClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        let timeoutId: number | undefined;
        let callbacks: { [id: string]: () => void } = {};

        client.systemservice = {
            enabled: true,
            lastSavedAt: 0,
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%System Service%end%]:%end% ${text}`);
            },
            error(text) {
                client.systemservice.echo(`%red%${text}`);
            },
            save(newCallbackId?: string, newCallback?: () => void) {
                if (newCallbackId && newCallback) {
                    callbacks[newCallbackId] = newCallback;
                }

                if (timeoutId) {
                    return;
                }

                // For example: 30s - 60s = -30s so it will then be saved instantly.
                const timeoutMilliseconds = Math.max(30000 - (Date.now() - client.systemservice.lastSavedAt), 0);

                timeoutId = window.setTimeout(() => {
                    for (let id in callbacks) {
                        callbacks[id]();
                    }

                    callbacks = {};

                    gmcp_save_system();

                    client.systemservice.lastSavedAt = Date.now();

                    client.systemservice.echo('Settings saved.');

                    timeoutId = undefined;
                }, timeoutMilliseconds);
            },
            sendCommand(command, echo = false) {
                ws_send(command + '\r\n');

                if (echo) {
                    display_notice(command);
                }
            }
        };

        client.systemservice.echo('Loaded.');
    }
);
