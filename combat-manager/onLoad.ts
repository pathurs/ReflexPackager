import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { CombatManagerClient, CombatManager, CombatManagerSettings } from './combat-manager';

declare const client: CombatManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class _CombatManagerClass extends client.systemService.BasePackage<CombatManagerSettings> implements CombatManager {
            public constructor () {
                super(
                    'Combat Manager',
                    'combat-manager:settings',
                    {
                        enabled: true
                    }
                );

                this.echo('Loaded.');
            }
        }

        client.combatManager = new _CombatManagerClass();
    }
);
