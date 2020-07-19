import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { AfflictionManagerClient, AfflictionManager, AfflictionManagerSettings } from './affliction-manager';

declare const client: AfflictionManagerClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class _AfflictionManager extends client.systemService.BasePackage<AfflictionManagerSettings> implements AfflictionManager {
            public constructor () {
                super(
                    'Affliction Manager',
                    'affliction-manager:settings',
                    {
                        enabled: true
                    }
                );

                this.echo('Loaded.');
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

        client.afflictionManager = new _AfflictionManager();
    }
);
