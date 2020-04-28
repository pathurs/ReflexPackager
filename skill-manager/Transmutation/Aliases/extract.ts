import { AliasItem, AliasType, ExecuteScriptAction } from '../../../source';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { SkillManagerClient } from '../../skill-manager';

declare const client: SkillManagerClient & GMCPServiceClient;

export const extract = new AliasItem(
    'Extract',
    /^extract$/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function () {
                send_command('minerals');

                client.skillmanager.transmutation.running = true;
            }
        )
    ]
);
