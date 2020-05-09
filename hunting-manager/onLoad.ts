import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { QueueServiceClient } from 'queue-service/queue-service';
import { HuntingManagerClient } from './hunting-manager';

declare const client: HuntingManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient & QueueServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.huntingmanager = {
            active: false,
            settings: get_variable('hunting-manager:settings') || {
                enabled: true,
                areas: {},
                attackCommand: 'kill',
                warnAtPercent: 30,
                shieldAtPercent: 20,
                autoShield: false,
                fleeAtPercent: 10,
                autoFlee: false
            },
            target: {
                findPriorityTarget() {
                    if (!client.huntingmanager.settings.areas[client.gmcpservice.room.area]) {
                        return;
                    }

                    const roomMobs = client.gmcpservice.items.room.filter(item => item.attrib?.includes('m'));

                    for (const areaMobName of client.huntingmanager.settings.areas[client.gmcpservice.room.area].mobs) {
                        for (const roomMob of roomMobs) {
                            if (roomMob.name === areaMobName) {
                                return roomMob;
                            }
                        }
                    }

                    return undefined;
                },
                setTarget(target) {
                    if (client.huntingmanager.target.currentTarget && target && client.huntingmanager.target.currentTarget.id === target.id) {
                        client.huntingmanager.target.currentTarget = target;

                        return;
                    }

                    client.huntingmanager.target.currentTarget = target;

                    if (!client.huntingmanager.target.currentTarget) {
                        client.huntingmanager.stop();

                        return;
                    }

                    GMCP.Target = client.huntingmanager.target.currentTarget.id;

                    set_variable('tar', client.huntingmanager.target.currentTarget.id);

                    set_current_target_info(client.huntingmanager.target.currentTarget.name, '100%', undefined);

                    send_GMCP('IRE.Target.Set', client.huntingmanager.target.currentTarget.id);

                    client.huntingmanager.echo(`Targetting %lightgray%${client.huntingmanager.target.currentTarget.name}%end% (%lightgray%${client.huntingmanager.target.currentTarget.id}%end%)`);

                },
                tryTargetPriority() {
                    client.huntingmanager.target.setTarget(client.huntingmanager.target.findPriorityTarget());
                }
            },
            attack: {
                setAttackCommand(command) {
                    client.huntingmanager.settings.attackCommand = command;

                    client.systemservice.sendCommand(`alias set huntingmanagerattack stand/${client.huntingmanager.settings.attackCommand}`);

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now attack using '%lightgray%${client.huntingmanager.settings.attackCommand}%end%'.`);
                },
                attackTarget() {
                    if (!client.huntingmanager.target.currentTarget) {
                        client.huntingmanager.error('Cannot attack. No target set.');
                        client.huntingmanager.stop();

                        return;
                    }

                    client.systemservice.sendCommand(`queue add eqbal huntingmanagerattack {${client.huntingmanager.target.currentTarget.id}}`);

                    client.huntingmanager.echo(`Attacking %lightgray%${client.huntingmanager.target.currentTarget.name}%end% (%lightgray%${client.huntingmanager.target.currentTarget.id}%end%)`);
                },
                tryAttackTarget() {
                    if (client.huntingmanager.target.currentTarget) {
                        client.huntingmanager.attack.attackTarget();
                    }
                }
            },
            raze: {
                setRazeCommand(command) {
                    client.huntingmanager.settings.razeCommand = command;

                    client.systemservice.sendCommand(`alias set huntingmanagerraze stand/${client.huntingmanager.settings.razeCommand}`);

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now raze using '%lightgray%${client.huntingmanager.settings.razeCommand}%end%'.`);
                },
                razeTarget() {
                    if (!client.huntingmanager.settings.razeCommand) {
                        client.huntingmanager.error('Cannot raze. No raze command set.');

                        return;
                    }

                    if (!client.huntingmanager.target.currentTarget) {
                        client.huntingmanager.error('Cannot raze. No target set.');
                        client.huntingmanager.stop();

                        return;
                    }

                    client.systemservice.sendCommand(`queue prepend eqbal huntingmanagerraze {${client.huntingmanager.target.currentTarget.id}}`);

                    client.huntingmanager.echo(`Razing %lightgray%${client.huntingmanager.target.currentTarget.name}%end% (%lightgray%${client.huntingmanager.target.currentTarget.id}%end%)`);
                },
                tryRazeTarget() {
                    if (client.huntingmanager.settings.razeCommand && client.huntingmanager.target.currentTarget) {
                        client.huntingmanager.raze.razeTarget();
                    }
                }
            },
            warn: {
                setWarnAtPercent(percent) {
                    client.huntingmanager.settings.warnAtPercent = percent;

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now warn below '%lightgray%${client.huntingmanager.settings.warnAtPercent}%%end%'.`);
                }
            },
            shield: {
                setShieldCommand(command) {
                    client.huntingmanager.settings.shieldCommand = command;

                    client.systemservice.sendCommand(`alias set huntingmanagershield stand/${client.huntingmanager.settings.shieldCommand}`);

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now shield using '%lightgray%${client.huntingmanager.settings.shieldCommand}%end%'.`);
                },
                setShieldAtPercent(percent) {
                    client.huntingmanager.settings.shieldAtPercent = percent;

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now attempt to shield below '%lightgray%${client.huntingmanager.settings.shieldAtPercent}%%end%'.`);
                },
                shield() {
                    if (!client.huntingmanager.settings.shieldCommand) {
                        client.huntingmanager.error('Cannot shield. No shield command set.');

                        return;
                    }

                    client.systemservice.sendCommand(`queue addclear eqbal huntingmanagershield`);

                    client.huntingmanager.echo(`Shielding.`);
                },
                tryShield() {
                    if (client.huntingmanager.settings.shieldCommand) {
                        client.huntingmanager.shield.shield();
                    }
                }
            },
            flee: {
                setFleeAtPercent(percent) {
                    client.huntingmanager.settings.fleeAtPercent = percent;

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now attempt to flee below '%lightgray%${client.huntingmanager.settings.fleeAtPercent}%%end%'.`);
                },
                flee() {

                },
                tryFlee() {

                }
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%Hunting Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.huntingmanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('hunting-manager', () => {
                    set_variable('hunting-manager:settings', client.huntingmanager.settings);

                    client.huntingmanager.echo('Settings saved.');
                });
            },
            addArea(area: string) {
                if (client.huntingmanager.settings.areas[area]) {
                    return;
                }

                client.huntingmanager.settings.areas[area] = {
                    name: area,
                    mobs: []
                };

                client.huntingmanager.echo(`Add new area: '%lightgray%${area}%end%'.`);

                client.huntingmanager.save();
            },
            addMob(area: string, mob: string) {
                if (!client.huntingmanager.settings.areas[area]) {
                    client.huntingmanager.addArea(area);
                }

                if (client.huntingmanager.settings.areas[area].mobs.includes(mob)) {
                    return;
                }

                client.huntingmanager.settings.areas[area].mobs.push(mob);

                client.huntingmanager.echo(`Add new mob '%lightgray%${mob}%end%' to area '%lightgray%${area}%end%'.`);

                client.huntingmanager.save();
            },
            start() {
                if (client.huntingmanager.active) {
                    return;
                }

                client.huntingmanager.target.tryTargetPriority();

                if (client.huntingmanager.target.currentTarget) {
                    client.huntingmanager.active = true;

                    client.huntingmanager.attack.tryAttackTarget();

                    client.huntingmanager.echo('Started hunting.');
                }
                else {
                    client.huntingmanager.error('Cannot start hunting. No targets found.');
                }
            },
            stop() {
                if (!client.huntingmanager.active) {
                    return;
                }

                client.huntingmanager.active = false;

                // client.queueservice.balanceQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemservice.sendCommand(`queue remove bal ${index + 1}`);
                //     }
                // });

                // client.queueservice.equilibriumQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemservice.sendCommand(`queue remove eq ${index + 1}`);
                //     }
                // });

                // client.queueservice.equilibriumBalanceQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemservice.sendCommand(`queue remove eqbal ${index + 1}`);
                //     }
                // });

                client.huntingmanager.echo('Stopped hunting.');
            }
        };

        client.gmcpservice.subscribe(['Char.Items.List', 'Char.Items.Remove'], args => {
            if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
                if (args.gmcp_args.location === 'room') {
                    if (args.gmcp_method === 'Char.Items.List') {
                        const currentTarget = client.huntingmanager.target.currentTarget;

                        if (currentTarget) {
                            const mob = args.gmcp_args.items.find(value => value.id === currentTarget.id);

                            if (!mob) {
                                client.huntingmanager.target.tryTargetPriority();
                            }
                        }
                    }
                    else {
                        if (client.huntingmanager.target.currentTarget) {
                            const mob = args.gmcp_args.item;

                            if (client.huntingmanager.target.currentTarget.id === mob.id) {
                                client.huntingmanager.target.tryTargetPriority();
                            }
                        }
                    }
                }
            }
        });

        // client.gmcpservice.subscribe(['IRE.Target.Set'], args => {
        //     if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
        //         if (!args.gmcp_args) {
        //             client.huntingmanager.target.tryTargetPriority();

        //             return;
        //         }
        //     }
        // });

        client.gmcpservice.subscribe(['Room.Info'], () => {
            if (client.huntingmanager.settings.enabled && client.huntingmanager.active) {
                if (client.gmcpservice.previousRoom.num !== client.gmcpservice.room.num) {
                    client.huntingmanager.stop();
                }
            }
        });

        client.gmcpservice.subscribe(['Char.Vitals'], args => {
            if (client.huntingmanager.active) {
                const hp = Number(args.gmcp_args.hp);
                const maxhp = Number(args.gmcp_args.maxhp);
                const percent = hp / maxhp * 100;
                const percentText = Math.ceil(percent);

                if (client.huntingmanager.settings.fleeAtPercent && percent <= client.huntingmanager.settings.fleeAtPercent) {
                    if (client.huntingmanager.settings.autoFlee) {
                        client.huntingmanager.flee.tryFlee();

                        client.huntingmanager.echo(`%red% ! FLEEING ! %end% You are below %red%${percentText}%%end% health! %red% ! FLEEING ! %end%`);
                    }
                    else {
                        client.huntingmanager.echo(`%red% ! FLEE ! %end% You are below %red%${percentText}%%end% health! %red% ! FLEE ! %end%`);
                    }

                }
                else if (client.huntingmanager.settings.shieldAtPercent && percent <= client.huntingmanager.settings.shieldAtPercent) {
                    if (client.huntingmanager.settings.autoShield) {
                        client.huntingmanager.shield.tryShield();

                        client.huntingmanager.echo(`%orange% ! SHIELDING ! %end% You are below %orange%${percentText}%%end% health! %orange% ! SHIELDING ! %end%`);
                    }
                    else {
                        client.huntingmanager.echo(`%orange% ! SHIELD ! %end% You are below %orange%${percentText}%%end% health! %orange% ! SHIELD ! %end%`);
                    }
                }
                else if (client.huntingmanager.settings.warnAtPercent && percent <= client.huntingmanager.settings.warnAtPercent) {
                    client.huntingmanager.echo(`%yellow% ! WARNING ! %end% You are below %yellow%${percentText}%%end% health! %yellow% ! WARNING ! %end%`);
                }
            }
        });

        client.queueservice.subscribe(['bal', 'eq', 'eqbal'], (_queue, method, args) => {
            if (client.huntingmanager.active) {
                if (method === 'run' && args.command.toLowerCase().startsWith('huntingmanagerattack')) {
                    client.huntingmanager.attack.tryAttackTarget();
                }
            }
        });

        client.systemservice.sendCommand(`alias set huntingmanagerattack stand/${client.huntingmanager.settings.attackCommand}`);
        client.systemservice.sendCommand(`alias set huntingmanagerraze stand/${client.huntingmanager.settings.razeCommand}`);
        client.systemservice.sendCommand(`alias set huntingmanagershield stand/${client.huntingmanager.settings.shieldCommand}`);

        client.huntingmanager.echo('Loaded.');
    }
);
