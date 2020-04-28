import { AliasItem, AliasType, ExecuteScriptAction } from '../../source';
import { HuntingManagerClient } from '../hunting-manager';

declare const client: HuntingManagerClient;

export const huntingManager = new AliasItem(
    'Hunting Manager',
    /^(?:hm|hunting\-manager|hunting manager) ([\w\W]*)/,
    AliasType.RegularExpression,
    [
        new ExecuteScriptAction(
            function (args: GMCPAliasRegexArgs) {
                const parts = args[1]?.trim().split(' ') || [];

                switch (`${parts[0]}`.toLowerCase()) {
                    case 'start':
                        client.huntingmanager.start();
                        break;

                    case 'stop':
                        client.huntingmanager.stop();
                        break;

                    case 'attack':
                    case 'attackcommand':
                        {
                            const command = parts.slice(1).join(' ');

                            if (!command) {
                                client.huntingmanager.error(`Invalid attack command '${command}'.`);
                                break;
                            }

                            client.huntingmanager.settings.attackCommand = command;

                            client.huntingmanager.save();

                            client.huntingmanager.echo(`Shield attack is now '${client.huntingmanager.settings.attackCommand}'.`);
                        }
                        break;

                    case 'raze':
                    case 'razecommand':
                        {
                            const command = parts.slice(1).join(' ');

                            if (!command) {
                                client.huntingmanager.error(`Invalid raze command '${command}'.`);
                                break;
                            }

                            client.huntingmanager.settings.razeCommand = command;

                            client.huntingmanager.save();

                            client.huntingmanager.echo(`Raze command is now '${client.huntingmanager.settings.razeCommand}'.`);
                        }
                        break;

                    case 'shield':
                    case 'shieldcommand':
                        {
                            const command = parts.slice(1).join(' ');

                            if (!command) {
                                client.huntingmanager.error(`Invalid shield command '${command}'.`);
                                break;
                            }

                            client.huntingmanager.settings.shieldCommand = command;

                            client.huntingmanager.save();

                            client.huntingmanager.echo(`Shield command is now '${client.huntingmanager.settings.shieldCommand}'.`);
                        }
                        break;
                }
            }
        )
    ]
);
