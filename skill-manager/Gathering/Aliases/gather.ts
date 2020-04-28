import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient & GMCPServiceClient;

export const gather = new AliasItem(
    'Gather',
    /^gather$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                send_command('plants');

                client.skillmanager.gathering.running = true;
            }
        )
    ]
);
