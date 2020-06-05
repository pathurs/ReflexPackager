import { FunctionItem } from '../source';
import { DisplayServiceClient, DisplayService } from 'display-service/display-service';
import { SystemServiceClient, SystemService } from 'system-service/system-service';
import { AfflictionManagerClient, AfflictionManager } from './affliction-manager';

declare const client: AfflictionManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class AfflictionManagerClass implements AfflictionManager {
            settings = this.systemService.defaultsDeep(
                get_variable('affliction-manager:settings'),
                {
                    enabled: true
                }
            );

            public constructor (
                private readonly displayService: DisplayService,
                private readonly systemService: SystemService
            ) {
                this.echo('Loaded.');
            }

            public echo(text: string) {
                this.displayService.echo(`%lightgray%[%deepskyblue%Affliction Manager%end%]:%end% ${text}`);
            }

            public error(text: string) {
                this.echo(`%red%${text}%end%`);
            }

            public save() {
                this.systemService.save('people-manager', () => {
                    set_variable('affliction-manager:settings', this.settings);

                    this.echo('Settings saved.');
                });
            }

            public predict(affliction: string) {
                this.systemService.sendCommand(`curing predict ${affliction}`);
            }

            public unpredict(affliction: string) {
                this.systemService.sendCommand(`curing unpredict ${affliction}`);
            }

            public unpredictAll() {
                this.systemService.sendCommand(`curing unpredict all`);
            }
        }

        client.afflictionManager = new AfflictionManagerClass(client.displayservice, client.systemService);
    }
);
