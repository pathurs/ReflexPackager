import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient } from 'gmcp-service/gmcp-service';
import { QueueManagerClient } from 'queue-manager/queue-manager';
import { HuntingManagerClient, Area } from './hunting-manager';

declare const client: HuntingManagerClient & DisplayServiceClient & SystemServiceClient & GMCPServiceClient & QueueManagerClient;

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
                callTargets: false,
                setTarget(targetOrIdOrUndefined) {
                    const target = typeof targetOrIdOrUndefined === 'number' ? client.huntingmanager.target.findTargetById(targetOrIdOrUndefined) : targetOrIdOrUndefined;

                    if (client.huntingmanager.target.currentTarget && target && client.huntingmanager.target.currentTarget.id === target.id) {
                        client.huntingmanager.target.currentTarget = target;

                        return;
                    }

                    if (!target) {
                        client.huntingmanager.stop();

                        return;
                    }

                    client.huntingmanager.target.currentTarget = target;

                    client.huntingmanager.addMob(client.gmcpservice.room.area, client.huntingmanager.target.currentTarget.name);

                    if (client.huntingmanager.target.callTargets) {
                        client.systemservice.sendCommand(`pt Target: ${client.huntingmanager.target.currentTarget.id}`);
                    }

                    GMCP.Target = client.huntingmanager.target.currentTarget.id;

                    set_variable('tar', client.huntingmanager.target.currentTarget.id);

                    set_current_target_info(client.huntingmanager.target.currentTarget.name, '100%', undefined);

                    send_GMCP('IRE.Target.Set', client.huntingmanager.target.currentTarget.id);

                    client.huntingmanager.echo(`Targetting %lightgray%${client.huntingmanager.target.currentTarget.name}%end% (%lightgray%${client.huntingmanager.target.currentTarget.id}%end%).`);
                },
                setTargetCaller(targetCallerName) {
                    if (!targetCallerName || targetCallerName === 'clear' || targetCallerName === 'none') {
                        const wasCallingTarget = client.huntingmanager.target.callTargets;

                        client.huntingmanager.target.targetCallerName = undefined;
                        client.huntingmanager.target.callTargets = false;

                        if (wasCallingTarget) {
                            client.huntingmanager.echo(`%lightgray%We%end% are no longer calling targets.`);
                        }
                        else if (client.huntingmanager.target.targetCallerName) {
                            client.huntingmanager.echo(`No longer following target calls from '%lightgray%${client.huntingmanager.target.targetCallerName}%end%'.`);
                        }
                    }
                    else if (targetCallerName.toLowerCase() === 'me') {
                        client.huntingmanager.target.targetCallerName = undefined;
                        client.huntingmanager.target.callTargets = true;

                        client.systemservice.sendCommand(`pt I am now calling targets.`);

                        client.huntingmanager.echo(`%lightgray%We%end% are now calling targets.`);
                    }
                    else {
                        client.huntingmanager.target.targetCallerName = targetCallerName;
                        client.huntingmanager.target.callTargets = false;

                        client.huntingmanager.echo(`Now following target calls from '%lightgray%${client.huntingmanager.target.targetCallerName}%end%'.`);
                    }
                },
                findTargetById(id) {
                    const area = client.huntingmanager.settings.areas[client.gmcpservice.room.area];

                    if (!area) {
                        return undefined;
                    }

                    const target = client.gmcpservice.items.room.find(item => item.attrib?.includes('m') && item.id === id.toString());

                    return target;
                },
                findPriorityTarget() {
                    const area = client.huntingmanager.settings.areas[client.gmcpservice.room.area];

                    if (!area) {
                        return;
                    }

                    const roomMobs = client.gmcpservice.items.room.filter(item => item.attrib?.includes('m'));

                    for (const areaMobName of area.mobs) {
                        for (const roomMob of roomMobs) {
                            if (roomMob.name === areaMobName) {
                                return roomMob;
                            }
                        }
                    }

                    return undefined;
                },
                tryTargetPriority() {
                    if (client.huntingmanager.target.targetCallerName) {
                        client.huntingmanager.stop();
                    }
                    else {
                        client.huntingmanager.target.setTarget(client.huntingmanager.target.findPriorityTarget());
                    }
                }
            },
            attack: {
                setAttackCommand(command) {
                    client.huntingmanager.settings.attackCommand = command;

                    client.huntingmanager.save();

                    client.huntingmanager.echo(`Will now attack using '%lightgray%${client.huntingmanager.settings.attackCommand}%end%'.`);
                },
                attackTarget() {
                    if (!client.huntingmanager.target.currentTarget) {
                        client.huntingmanager.error('Cannot attack. No target set.');
                        client.huntingmanager.stop();

                        return;
                    }


                    client.queuemanager.appendCommand('stand', 'equilibriumBalance');
                    client.queuemanager.appendCommand(client.huntingmanager.settings.attackCommand, 'equilibriumBalance', 'equilibriumBalance');

                    client.huntingmanager.echo(`Attacking %lightgray%${client.huntingmanager.target.currentTarget.name}%end% (%lightgray%${client.huntingmanager.target.currentTarget.id}%end%)`);
                },
                tryAttackTarget() {
                    if (client.huntingmanager.target.currentTarget) {
                        const attackCommand = client.huntingmanager.settings.attackCommand.toLowerCase();

                        const index = client.queuemanager.equilibriumBalance.queue.findIndex(command => {
                            command.command.toLowerCase() === attackCommand;
                        });

                        if (index === -1) {
                            client.huntingmanager.attack.attackTarget();
                        }
                    }
                }
            },
            raze: {
                setRazeCommand(command) {
                    client.huntingmanager.settings.razeCommand = command;

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

                    client.queuemanager.clearQueue('equilibriumBalance');
                    client.queuemanager.appendCommand('stand', 'equilibriumBalance');
                    client.queuemanager.appendCommand(client.huntingmanager.settings.razeCommand, 'equilibriumBalance', 'equilibriumBalance');
                    client.queuemanager.appendCommand('stand', 'equilibriumBalance');
                    client.queuemanager.appendCommand(client.huntingmanager.settings.attackCommand, 'equilibriumBalance', 'equilibriumBalance');

                    client.huntingmanager.echo(`Razing %lightgray%${client.huntingmanager.target.currentTarget.name}%end% (%lightgray%${client.huntingmanager.target.currentTarget.id}%end%)`);
                },
                tryRazeTarget() {
                    if (client.huntingmanager.settings.razeCommand && client.huntingmanager.target.currentTarget) {
                        const razeCommand = client.huntingmanager.settings.razeCommand.toLowerCase();

                        const index = client.queuemanager.equilibriumBalance.queue.findIndex(command => {
                            command.command.toLowerCase() === razeCommand;
                        });

                        if (index === -1) {
                            client.huntingmanager.raze.razeTarget();
                        }
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

                    client.queuemanager.appendCommand('stand', 'equilibriumBalance');
                    client.queuemanager.appendCommand(client.huntingmanager.settings.shieldCommand, 'equilibriumBalance', 'equilibriumBalance');

                    client.huntingmanager.echo(`Shielding.`);
                },
                tryShield() {
                    if (client.huntingmanager.settings.shieldCommand) {
                        const shieldCommand = client.huntingmanager.settings.shieldCommand.toLowerCase();

                        const index = client.queuemanager.equilibriumBalance.queue.findIndex(command => {
                            command.command.toLowerCase() === shieldCommand;
                        });

                        if (index === -1) {
                            client.huntingmanager.shield.shield();
                        }
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
            addArea(areaName) {
                let area = client.huntingmanager.settings.areas[areaName];

                if (area) {
                    return area;
                }

                area = {
                    name: areaName,
                    mobs: []
                };

                client.huntingmanager.settings.areas[areaName] = area;

                client.huntingmanager.echo(`Added new area: '%lightgray%${areaName}%end%'.`);

                client.huntingmanager.save();

                return area;
            },
            showArea(areaName) {
                let area = client.huntingmanager.settings.areas[areaName];

                if (!area) {
                    client.huntingmanager.error(`Unknown area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                client.displayservice.table(
                    `Area Mob Priorities: ${area.name}`,
                    [
                        {
                            title: undefined,
                            columns: <1>1,
                            items: area.mobs.map((mobName, index) => {
                                return {
                                    label: makeClickableIndex(<Area>area, mobName, index),
                                    value: mobName
                                };
                            })
                        }
                    ]
                );

                function makeClickableIndex(area: Area, mobName: string, index: number) {
                    let result = '';

                    if (index === 0) {
                        result += ' ';
                    }
                    else {
                        result += client.displayservice.commandify(
                            client.displayservice.colorify('%green%^'),
                            `hunting-manager move mob ${mobName} ${index - 1}`,
                            'Move up'
                        );
                    }

                    if (index >= area.mobs.length - 1) {
                        result += '  ';
                    }
                    else {
                        result += ' ';

                        result += client.displayservice.clickify(
                            client.displayservice.colorify('%red%v'),
                            `client.huntingmanager.moveMob('${area.name}', '${mobName}', ${index + 1});`,
                            'Move down'
                        );
                    }

                    result += ` ${index}`

                    return result;
                }
            },
            addMob(areaName, mobName) {
                let area = client.huntingmanager.settings.areas[areaName];

                if (!area) {
                    area = client.huntingmanager.addArea(areaName);
                }

                if (area.mobs.includes(mobName)) {
                    return;
                }

                area.mobs.push(mobName);

                client.huntingmanager.echo(`Added new mob '%lightgray%${mobName}%end%' to area '%lightgray%${areaName}%end%'.`);

                client.huntingmanager.save();
            },
            removeMob(areaName, mobName) {
                const area = client.huntingmanager.settings.areas[areaName];

                if (!area) {
                    client.huntingmanager.error(`Unknown area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                const index = area.mobs.findIndex(value => value === mobName);

                if (!area.mobs.includes(mobName) || index === -1) {
                    client.huntingmanager.error(`Unknown mob '%lightgray%${mobName}%end%' in area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                area.mobs.splice(index, 1);

                client.huntingmanager.echo(`Removed mob '%lightgray%${mobName}%end%' from area '%lightgray%${areaName}%end%'.`);

                client.huntingmanager.save();
            },
            moveMob(areaName, mobName, index) {
                const area = client.huntingmanager.settings.areas[areaName];

                if (!area) {
                    client.huntingmanager.error(`Unknown area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                const currentIndex = area.mobs.findIndex(value => value === mobName);

                if (!area.mobs.includes(mobName) || currentIndex === -1) {
                    client.huntingmanager.error(`Unknown mob '%lightgray%${areaName}%end%' in area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                if (index > area.mobs.length - 1 || index < 0) {
                    client.huntingmanager.error(`Index '%lightgray%${areaName}%end%' must be between '%lightgray%0%end%' and '%lightgray%${area.mobs.length - 1}%end%'.`)

                    return;
                }

                area.mobs.splice(currentIndex, 1);
                area.mobs.splice(index, 0, mobName);

                client.huntingmanager.echo(`Moved mob '%lightgray%${mobName}%end%' in area '%lightgray%${areaName}%end%' from '%lightgray%${currentIndex}%end%' to '%lightgray%${index}%end%'.`);

                client.huntingmanager.showArea(area.name);

                client.huntingmanager.save();
            },
            start() {
                if (client.huntingmanager.active) {
                    return;
                }

                if (!client.huntingmanager.target.targetCallerName) {
                    client.huntingmanager.target.tryTargetPriority();
                }

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

                client.huntingmanager.target.currentTarget = undefined;

                setTimeout(() => {
                    client.huntingmanager.active = false;
                });

                // client.queuemanager.balanceQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemservice.sendCommand(`queue remove bal ${index + 1}`);
                //     }
                // });

                // client.queuemanager.equilibriumQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemservice.sendCommand(`queue remove eq ${index + 1}`);
                //     }
                // });

                // client.queuemanager.equilibriumBalanceQueue.forEach((value, index) => {
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

        client.queuemanager.subscribe(['balance', 'equilibrium', 'equilibriumBalance'], (_queue, method, args) => {
            if (client.huntingmanager.active) {
                if (method === 'run') {
                    const commands = args.commands.map(value => value.command.toLowerCase());

                    if (commands.includes(client.huntingmanager.settings.attackCommand)) {
                        client.huntingmanager.attack.tryAttackTarget();
                    }
                }
            }
        });

        client.huntingmanager.echo('Loaded.');
    }
);
