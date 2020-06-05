import { FunctionItem } from '../source';
import { SystemServiceClient } from './system-service';
import { DisplayServiceClient } from 'display-service/display-service';

declare const client: SystemServiceClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        let timeoutId: number | undefined;
        let callbacks: { [id: string]: () => void } = {};

        client.systemService = {
            enabled: true,
            lastSavedAt: 0,
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%System Service%end%]:%end% ${text}`);
            },
            error(text) {
                client.systemService.echo(`%red%${text}%end%`);
            },
            save(newCallbackId?: string, newCallback?: () => void) {
                if (newCallbackId && newCallback) {
                    callbacks[newCallbackId] = newCallback;
                }

                if (timeoutId) {
                    return;
                }

                // For example: 30s - 60s = -30s so it will then be saved instantly.
                const timeoutMilliseconds = Math.max(30000 - (Date.now() - client.systemService.lastSavedAt), 0);

                timeoutId = window.setTimeout(() => {
                    for (let id in callbacks) {
                        callbacks[id]();
                    }

                    callbacks = {};

                    gmcp_save_system();

                    client.systemService.lastSavedAt = Date.now();

                    client.systemService.echo('Settings saved.');

                    timeoutId = undefined;
                }, timeoutMilliseconds);
            },
            mergeDeep<T extends object>(target: T, ...sources: T[]): T {
                if (!sources.length) {
                    return target
                };

                const source = sources.shift();

                if (isObject(target) && isObject(source)) {
                    for (const key in source) {
                        if (isObject(source[<keyof object>key])) {
                            if (!target[<keyof object>key]) {
                                Object.assign(target, { [key]: {} });
                            }

                            client.systemService.mergeDeep(target[<keyof object>key], source[<keyof object>key]);
                        } else {
                            Object.assign(target, { [key]: source[<keyof object>key] });
                        }
                    }
                }

                return client.systemService.mergeDeep(target, ...sources);
            },
            defaultsDeep<T extends object>(target: T | undefined, ...sources: T[]): T {
                return client.systemService.mergeDeep<T>(<T>{}, ...[...sources, target || <T>{}]);
            },
            sendCommand(command, echo = false) {
                ws_send(command + '\r\n');

                if (echo) {
                    display_notice(command);
                }
            },
            sendCommands(commands, echo = false) {
                commands.forEach(command => {
                    client.systemService.sendCommand(command, echo);
                });
            }
        };

        function isObject(object: unknown): object is object {
            return object !== undefined && typeof object === 'object' && !Array.isArray(object);
        }

        client.systemService.echo('Loaded.');
    }
);
