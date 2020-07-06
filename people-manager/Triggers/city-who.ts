import { MultiLineTriggerItem, ExecuteScriptAction } from '../../source';
import { SystemServiceClient } from 'system-service/system-service';
import { SkillManagerClient } from 'skill-manager/skill-manager';

declare const client: SkillManagerClient & SystemServiceClient;

export const cityWho = new MultiLineTriggerItem(
    'City Who',
    [
        /^Citizen                                                   Rank CT  Class$/,
        /^-------                                                   ---- --  -----$/,
    ],
    [
        new ExecuteScriptAction(
            function (args: MultiLineTriggerFunctionArgs) {
                console.log('City Who');
                console.log(args);

                const nameRegExp = /\u001b\[38;5;006m([A-Z][a-z]+)\u001b\[38;5;007m/;

                for (const line of args.block) {
                    if ('line' in line) {
                        const name = (line.line.match(nameRegExp) || [])[1];

                        if (name) {
                            console.log(`Found: ${name}`);
                        }
                    }
                }
            }
        )
    ]
);



