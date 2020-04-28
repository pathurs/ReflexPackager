import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient & GMCPServiceClient;

export const harvest = new AliasItem(
    'Harvest',
    /^harvest$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                send_command('plants');

                client.skillmanager.harvesting.running = true;
            }
        )
    ]
);
