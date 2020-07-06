import { FunctionItem } from '../source';
import { DisplayServiceClient, DisplayService } from 'display-service/display-service';
import { SystemServiceClient, SystemService } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { CombatManagerClient, CombatManager } from './combat-manager';

declare const client: CombatManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class CombatManagerClass implements CombatManager {
            public constructor (
                private displayService: DisplayService,
                private systemService: SystemService,
            ) {
                this.echo('Loaded.');
            }

            public echo(text: string) {
                this.displayService.echo(`%lightgray%[%deepskyblue%Combat Manager%end%]:%end% ${text}`);
            }

            public error(text: string) {
                this.echo(`%red%${text}%end%`);
            }

            public save() {
                this.systemService.save('defence-manager', () => {
                    this.echo('Settings saved.');
                });
            }
        }

        client.combatManager = new CombatManagerClass(client.displayService, client.systemService);
    }
);
