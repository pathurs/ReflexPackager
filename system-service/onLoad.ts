import { FunctionItem } from '../source';
import { SystemServiceClient, SystemService } from './system-service';
import { DisplayServiceClient, DisplayService } from 'display-service/display-service';

declare const client: SystemServiceClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class _BasePackage<TSettings extends object = object> {
            public readonly settings: TSettings;

            protected readonly displayService: DisplayService = client.displayService;
            protected readonly systemService: SystemService = client.systemService;

            public constructor (
                public readonly name: string,
                public readonly settingsId: string,
                settings: TSettings
            ) {
                this.settings = new Proxy(
                    this.systemService.defaultsDeep(get_variable(this.settingsId), settings),
                    {
                        set: <T extends object>(target: T, property: keyof T, value: T[keyof T]) => {
                            target[property] = value;

                            this.save();

                            return true;
                        }
                    }
                );
            }

            public echo(text: string): void {
                this.displayService.echo(`%lightgray%[%deepskyblue%${this.name}%end%]:%end% ${text}`);
            }

            public error(text: string): void {
                this.systemService.echo(`%red%${text}%end%`);
            }

            public save(): void {
                this.systemService.save(this.name, () => {
                    set_variable(this.settingsId, this.settings);

                    this.echo('Settings saved.');
                });
            }
        }

        class _SystemService implements SystemService {
            private timeoutId: number | undefined;
            private callbacks: { [id: string]: () => void } = {};

            public readonly name: string = 'System Service';
            public readonly settingsId: string = 'system-service:settings';
            public readonly settings: object;
            public readonly BasePackage = <any>_BasePackage;
            public lastSavedAt = 0;

            public constructor (
                settings: object,
                private readonly displayService: DisplayService
            ) {
                this.settings = new Proxy(
                    this.defaultsDeep(get_variable(this.settingsId), settings),
                    {
                        set: <T extends object>(target: T, property: keyof T, value: T[keyof T]) => {
                            target[property] = value;

                            this.save(this.name, () => {
                                set_variable(this.settingsId, this.settings);

                                this.echo('Settings saved.');
                            });

                            return true;
                        }
                    }
                );

                this.echo('Loaded.');
            }

            public echo(text: string) {
                this.displayService.echo(`%lightgray%[%deepskyblue%${this.name}%end%]:%end% ${text}`);
            }

            public error(text: string) {
                this.echo(`%red%${text}%end%`);
            }

            public save(newCallbackId: string, newCallback: () => void) {
                this.callbacks[newCallbackId] = newCallback;

                if (this.timeoutId) {
                    return;
                }

                // For example: 30s - 60s = -30s so it will then be saved instantly.
                const timeoutMilliseconds = Math.max(30000 - (Date.now() - this.lastSavedAt), 0);

                this.timeoutId = window.setTimeout(() => {
                    for (let id in this.callbacks) {
                        this.callbacks[id]();
                    }

                    this.callbacks = {};

                    gmcp_save_system();

                    this.lastSavedAt = Date.now();

                    this.echo('Settings saved.');

                    this.timeoutId = undefined;
                }, timeoutMilliseconds);
            }

            public copyDeep<T extends object>(target: T): T {
                return this.mergeDeep(<T>{}, target);
            }

            public mergeDeep<T extends object>(target: T, ...sources: Partial<T>[]): T {
                if (!sources.length) {
                    return target
                };

                const source = sources.shift();

                if (this.isObject(target) && this.isObject(source)) {
                    for (const key in source) {
                        if (this.isObject(source[<keyof object>key])) {
                            if (!target[<keyof object>key]) {
                                Object.assign(target, { [key]: {} });
                            }

                            this.mergeDeep(target[<keyof object>key], source[<keyof object>key]);
                        } else {
                            Object.assign(target, { [key]: source[<keyof object>key] });
                        }
                    }
                }

                return this.mergeDeep(target, ...sources);
            }

            public defaultsDeep<T extends object>(target: T | undefined, ...sources: T[]): T {
                return this.mergeDeep<T>(<T>{}, ...[...sources, target || <T>{}]);
            }

            public sendCommand(command: string, echo?: boolean): void {
                ws_send(command + '\r\n');

                if (echo) {
                    display_notice(command);
                }
            }

            public sendCommands(commands: string[], echo?: boolean): void {
                commands.forEach(command => {
                    this.sendCommand(command, echo);
                });
            }

            public isObject(object: unknown): object is object {
                return object !== undefined && typeof object === 'object' && !Array.isArray(object);
            }
        }

        client.systemService = new _SystemService(
            {},
            client.displayService
        );
    }
);
