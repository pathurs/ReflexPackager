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
        client.huntingManager = {
            active: false,
            settings: client.systemService.defaultsDeep(get_variable('hunting-manager:settings'), {
                enabled: true,
                areas: {},
                attackCommand: 'kill',
                warnAtPercent: 30,
                shieldAtPercent: 20,
                autoShield: false,
                fleeAtPercent: 10,
                autoFlee: false
            }),
            target: {
                callTargets: false,
                setTarget(targetOrIdOrUndefined) {
                    const target = typeof targetOrIdOrUndefined === 'number' ? client.huntingManager.target.findTargetById(targetOrIdOrUndefined) : targetOrIdOrUndefined;

                    if (client.huntingManager.target.currentTarget && target && client.huntingManager.target.currentTarget.id === target.id) {
                        client.huntingManager.target.currentTarget = target;

                        return;
                    }

                    if (!target) {
                        client.huntingManager.stop();

                        return;
                    }

                    client.huntingManager.target.currentTarget = target;

                    client.huntingManager.addMob(client.gmcpService.room.area, client.huntingManager.target.currentTarget.name);

                    if (client.huntingManager.target.callTargets) {
                        client.systemService.sendCommand(`pt Target: ${client.huntingManager.target.currentTarget.id}`);
                    }

                    GMCP.Target = client.huntingManager.target.currentTarget.id;

                    set_variable('tar', client.huntingManager.target.currentTarget.id);

                    set_current_target_info(client.huntingManager.target.currentTarget.name, '100%', undefined);

                    send_GMCP('IRE.Target.Set', client.huntingManager.target.currentTarget.id);

                    client.huntingManager.echo(`Targetting %lightgray%${client.huntingManager.target.currentTarget.name}%end% (%lightgray%${client.huntingManager.target.currentTarget.id}%end%).`);
                },
                setTargetCaller(targetCallerName) {
                    if (!targetCallerName || targetCallerName === 'clear' || targetCallerName === 'none') {
                        const wasCallingTarget = client.huntingManager.target.callTargets;

                        client.huntingManager.target.targetCallerName = undefined;
                        client.huntingManager.target.callTargets = false;

                        if (wasCallingTarget) {
                            client.huntingManager.echo(`%lightgray%We%end% are no longer calling targets.`);
                        }
                        else if (client.huntingManager.target.targetCallerName) {
                            client.huntingManager.echo(`No longer following target calls from '%lightgray%${client.huntingManager.target.targetCallerName}%end%'.`);
                        }
                    }
                    else if (targetCallerName.toLowerCase() === 'me') {
                        client.huntingManager.target.targetCallerName = undefined;
                        client.huntingManager.target.callTargets = true;

                        client.systemService.sendCommand(`pt I am now calling targets.`);

                        client.huntingManager.echo(`%lightgray%We%end% are now calling targets.`);
                    }
                    else {
                        client.huntingManager.target.targetCallerName = targetCallerName;
                        client.huntingManager.target.callTargets = false;

                        client.huntingManager.echo(`Now following target calls from '%lightgray%${client.huntingManager.target.targetCallerName}%end%'.`);
                    }
                },
                findTargetById(id) {
                    const area = client.huntingManager.settings.areas[client.gmcpService.room.area];

                    if (!area) {
                        return undefined;
                    }

                    const target = client.gmcpService.items.room.find(item => item.attrib?.includes('m') && item.id === id.toString());

                    return target;
                },
                findPriorityTarget() {
                    const area = client.huntingManager.settings.areas[client.gmcpService.room.area];

                    if (!area) {
                        return;
                    }

                    const roomMobs = client.gmcpService.items.room.filter(item => item.attrib?.includes('m'));

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
                    if (client.huntingManager.target.targetCallerName) {
                        client.huntingManager.stop();
                    }
                    else {
                        client.huntingManager.target.setTarget(client.huntingManager.target.findPriorityTarget());
                    }
                }
            },
            attack: {
                setAttackCommand(command) {
                    client.huntingManager.settings.attackCommand = command;

                    client.huntingManager.save();

                    client.huntingManager.echo(`Will now attack using '%lightgray%${client.huntingManager.settings.attackCommand}%end%'.`);
                },
                attackTarget() {
                    if (!client.huntingManager.target.currentTarget) {
                        client.huntingManager.error('Cannot attack. No target set.');
                        client.huntingManager.stop();

                        return;
                    }


                    client.queueManager.appendCommand('stand', 'equilibriumBalance');
                    client.queueManager.appendCommand(client.huntingManager.settings.attackCommand, 'equilibriumBalance', 'equilibriumBalance');

                    client.huntingManager.echo(`Attacking %lightgray%${client.huntingManager.target.currentTarget.name}%end% (%lightgray%${client.huntingManager.target.currentTarget.id}%end%)`);
                },
                tryAttackTarget() {
                    if (client.huntingManager.target.currentTarget) {
                        const attackCommand = client.huntingManager.settings.attackCommand.toLowerCase();

                        const index = client.queueManager.equilibriumBalanceQueue.findIndex(command => {
                            command.command.toLowerCase() === attackCommand;
                        });

                        if (index === -1) {
                            client.huntingManager.attack.attackTarget();
                        }
                    }
                }
            },
            raze: {
                setRazeCommand(command) {
                    client.huntingManager.settings.razeCommand = command;

                    client.huntingManager.save();

                    client.huntingManager.echo(`Will now raze using '%lightgray%${client.huntingManager.settings.razeCommand}%end%'.`);
                },
                razeTarget() {
                    if (!client.huntingManager.settings.razeCommand) {
                        client.huntingManager.error('Cannot raze. No raze command set.');

                        return;
                    }

                    if (!client.huntingManager.target.currentTarget) {
                        client.huntingManager.error('Cannot raze. No target set.');
                        client.huntingManager.stop();

                        return;
                    }

                    client.queueManager.clearQueue('equilibriumBalance');
                    client.queueManager.appendCommand('stand', 'equilibriumBalance');
                    client.queueManager.appendCommand(client.huntingManager.settings.razeCommand, 'equilibriumBalance', 'equilibriumBalance');
                    client.queueManager.appendCommand('stand', 'equilibriumBalance');
                    client.queueManager.appendCommand(client.huntingManager.settings.attackCommand, 'equilibriumBalance', 'equilibriumBalance');

                    client.huntingManager.echo(`Razing %lightgray%${client.huntingManager.target.currentTarget.name}%end% (%lightgray%${client.huntingManager.target.currentTarget.id}%end%)`);
                },
                tryRazeTarget() {
                    if (client.huntingManager.settings.razeCommand && client.huntingManager.target.currentTarget) {
                        const razeCommand = client.huntingManager.settings.razeCommand.toLowerCase();

                        const index = client.queueManager.equilibriumBalanceQueue.findIndex(command => {
                            command.command.toLowerCase() === razeCommand;
                        });

                        if (index === -1) {
                            client.huntingManager.raze.razeTarget();
                        }
                    }
                }
            },
            warn: {
                setWarnAtPercent(percent) {
                    client.huntingManager.settings.warnAtPercent = percent;

                    client.huntingManager.save();

                    client.huntingManager.echo(`Will now warn below '%lightgray%${client.huntingManager.settings.warnAtPercent}%%end%'.`);
                }
            },
            shield: {
                setShieldCommand(command) {
                    client.huntingManager.settings.shieldCommand = command;

                    client.huntingManager.save();

                    client.huntingManager.echo(`Will now shield using '%lightgray%${client.huntingManager.settings.shieldCommand}%end%'.`);
                },
                setShieldAtPercent(percent) {
                    client.huntingManager.settings.shieldAtPercent = percent;

                    client.huntingManager.save();

                    client.huntingManager.echo(`Will now attempt to shield below '%lightgray%${client.huntingManager.settings.shieldAtPercent}%%end%'.`);
                },
                shield() {
                    if (!client.huntingManager.settings.shieldCommand) {
                        client.huntingManager.error('Cannot shield. No shield command set.');

                        return;
                    }

                    client.queueManager.appendCommand('stand', 'equilibriumBalance');
                    client.queueManager.appendCommand(client.huntingManager.settings.shieldCommand, 'equilibriumBalance', 'equilibriumBalance');

                    client.huntingManager.echo(`Shielding.`);
                },
                tryShield() {
                    if (client.huntingManager.settings.shieldCommand) {
                        const shieldCommand = client.huntingManager.settings.shieldCommand.toLowerCase();

                        const index = client.queueManager.equilibriumBalanceQueue.findIndex(command => {
                            command.command.toLowerCase() === shieldCommand;
                        });

                        if (index === -1) {
                            client.huntingManager.shield.shield();
                        }
                    }
                }
            },
            flee: {
                setFleeAtPercent(percent) {
                    client.huntingManager.settings.fleeAtPercent = percent;

                    client.huntingManager.save();

                    client.huntingManager.echo(`Will now attempt to flee below '%lightgray%${client.huntingManager.settings.fleeAtPercent}%%end%'.`);
                },
                flee() {

                },
                tryFlee() {

                }
            },
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%Hunting Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.huntingManager.echo(`%red%${text}%end%`);
            },
            save() {
                client.systemService.save('hunting-manager', () => {
                    set_variable('hunting-manager:settings', client.huntingManager.settings);

                    client.huntingManager.echo('Settings saved.');
                });
            },
            addArea(areaName) {
                let area = client.huntingManager.settings.areas[areaName];

                if (area) {
                    return area;
                }

                area = {
                    name: areaName,
                    mobs: []
                };

                client.huntingManager.settings.areas[areaName] = area;

                client.huntingManager.echo(`Added new area: '%lightgray%${areaName}%end%'.`);

                client.huntingManager.save();

                return area;
            },
            showArea(areaName) {
                let area = client.huntingManager.settings.areas[areaName];

                if (!area) {
                    client.huntingManager.error(`Unknown area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                client.displayService.table(
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
                        result += client.displayService.commandify(
                            client.displayService.colorify('%green%^'),
                            `hunting-manager move mob ${mobName} ${index - 1}`,
                            'Move up'
                        );
                    }

                    if (index >= area.mobs.length - 1) {
                        result += '  ';
                    }
                    else {
                        result += ' ';

                        result += client.displayService.clickify(
                            client.displayService.colorify('%red%v'),
                            `client.huntingManager.moveMob('${area.name}', '${mobName}', ${index + 1});`,
                            'Move down'
                        );
                    }

                    result += ` ${index}`

                    return result;
                }
            },
            addMob(areaName, mobName) {
                let area = client.huntingManager.settings.areas[areaName];

                if (!area) {
                    area = client.huntingManager.addArea(areaName);
                }

                if (area.mobs.includes(mobName)) {
                    return;
                }

                area.mobs.push(mobName);

                client.huntingManager.echo(`Added new mob '%lightgray%${mobName}%end%' to area '%lightgray%${areaName}%end%'.`);

                client.huntingManager.save();
            },
            removeMob(areaName, mobName) {
                const area = client.huntingManager.settings.areas[areaName];

                if (!area) {
                    client.huntingManager.error(`Unknown area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                const index = area.mobs.findIndex(value => value === mobName);

                if (!area.mobs.includes(mobName) || index === -1) {
                    client.huntingManager.error(`Unknown mob '%lightgray%${mobName}%end%' in area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                area.mobs.splice(index, 1);

                client.huntingManager.echo(`Removed mob '%lightgray%${mobName}%end%' from area '%lightgray%${areaName}%end%'.`);

                client.huntingManager.save();
            },
            moveMob(areaName, mobName, index) {
                const area = client.huntingManager.settings.areas[areaName];

                if (!area) {
                    client.huntingManager.error(`Unknown area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                const currentIndex = area.mobs.findIndex(value => value === mobName);

                if (!area.mobs.includes(mobName) || currentIndex === -1) {
                    client.huntingManager.error(`Unknown mob '%lightgray%${areaName}%end%' in area '%lightgray%${areaName}%end%'.`)

                    return;
                }

                if (index > area.mobs.length - 1 || index < 0) {
                    client.huntingManager.error(`Index '%lightgray%${areaName}%end%' must be between '%lightgray%0%end%' and '%lightgray%${area.mobs.length - 1}%end%'.`)

                    return;
                }

                area.mobs.splice(currentIndex, 1);
                area.mobs.splice(index, 0, mobName);

                client.huntingManager.echo(`Moved mob '%lightgray%${mobName}%end%' in area '%lightgray%${areaName}%end%' from '%lightgray%${currentIndex}%end%' to '%lightgray%${index}%end%'.`);

                client.huntingManager.showArea(area.name);

                client.huntingManager.save();
            },
            start() {
                if (client.huntingManager.active) {
                    return;
                }

                if (!client.huntingManager.target.targetCallerName) {
                    client.huntingManager.target.tryTargetPriority();
                }

                if (client.huntingManager.target.currentTarget) {
                    client.huntingManager.active = true;

                    client.huntingManager.attack.tryAttackTarget();

                    client.huntingManager.echo('Started hunting.');
                }
                else {
                    client.huntingManager.error('Cannot start hunting. No targets found.');
                }
            },
            stop() {
                if (!client.huntingManager.active) {
                    return;
                }

                client.huntingManager.target.currentTarget = undefined;

                setTimeout(() => {
                    client.huntingManager.active = false;
                });

                // client.queueManager.balanceQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemService.sendCommand(`queue remove bal ${index + 1}`);
                //     }
                // });

                // client.queueManager.equilibriumQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemService.sendCommand(`queue remove eq ${index + 1}`);
                //     }
                // });

                // client.queueManager.equilibriumBalanceQueue.forEach((value, index) => {
                //     if (value.toLowerCase().startsWith('huntingmanager')) {
                //         client.systemService.sendCommand(`queue remove eqbal ${index + 1}`);
                //     }
                // });

                client.huntingManager.echo('Stopped hunting.');
            }
        };

        client.gmcpService.subscribe(['Char.Items.List', 'Char.Items.Remove'], args => {
            if (client.huntingManager.settings.enabled && client.huntingManager.active) {
                if (args.gmcp_args.location === 'room') {
                    if (args.gmcp_method === 'Char.Items.List') {
                        const currentTarget = client.huntingManager.target.currentTarget;

                        if (currentTarget) {
                            const mob = args.gmcp_args.items.find(value => value.id === currentTarget.id);

                            if (!mob) {
                                client.huntingManager.target.tryTargetPriority();
                            }
                        }
                    }
                    else {
                        if (client.huntingManager.target.currentTarget) {
                            const mob = args.gmcp_args.item;

                            if (client.huntingManager.target.currentTarget.id === mob.id) {
                                client.huntingManager.target.tryTargetPriority();
                            }
                        }
                    }
                }
            }
        });

        // client.gmcpService.subscribe(['IRE.Target.Set'], args => {
        //     if (client.huntingManager.settings.enabled && client.huntingManager.active) {
        //         if (!args.gmcp_args) {
        //             client.huntingManager.target.tryTargetPriority();

        //             return;
        //         }
        //     }
        // });

        client.gmcpService.subscribe(['Room.Info'], () => {
            if (client.huntingManager.settings.enabled && client.huntingManager.active) {
                if (client.gmcpService.previousRoom.num !== client.gmcpService.room.num) {
                    client.huntingManager.stop();
                }
            }
        });

        client.gmcpService.subscribe(['Char.Vitals'], args => {
            if (client.huntingManager.active) {
                const hp = Number(args.gmcp_args.hp);
                const maxhp = Number(args.gmcp_args.maxhp);
                const percent = hp / maxhp * 100;
                const percentText = Math.ceil(percent);

                if (client.huntingManager.settings.fleeAtPercent && percent <= client.huntingManager.settings.fleeAtPercent) {
                    if (client.huntingManager.settings.autoFlee) {
                        client.huntingManager.flee.tryFlee();

                        client.huntingManager.echo(`%red% ! FLEEING ! %end% You are below %red%${percentText}%%end% health! %red% ! FLEEING ! %end%`);
                    }
                    else {
                        client.huntingManager.echo(`%red% ! FLEE ! %end% You are below %red%${percentText}%%end% health! %red% ! FLEE ! %end%`);
                    }

                }
                else if (client.huntingManager.settings.shieldAtPercent && percent <= client.huntingManager.settings.shieldAtPercent) {
                    if (client.huntingManager.settings.autoShield) {
                        client.huntingManager.shield.tryShield();

                        client.huntingManager.echo(`%orange% ! SHIELDING ! %end% You are below %orange%${percentText}%%end% health! %orange% ! SHIELDING ! %end%`);
                    }
                    else {
                        client.huntingManager.echo(`%orange% ! SHIELD ! %end% You are below %orange%${percentText}%%end% health! %orange% ! SHIELD ! %end%`);
                    }
                }
                else if (client.huntingManager.settings.warnAtPercent && percent <= client.huntingManager.settings.warnAtPercent) {
                    client.huntingManager.echo(`%yellow% ! WARNING ! %end% You are below %yellow%${percentText}%%end% health! %yellow% ! WARNING ! %end%`);
                }
            }
        });

        client.queueManager.subscribe(['balance', 'equilibrium', 'equilibriumBalance'], (_queue, method, args) => {
            if (client.huntingManager.active) {
                if (method === 'run') {
                    const commands = args.commands.map(value => value.command.toLowerCase());

                    if (commands.includes(client.huntingManager.settings.attackCommand)) {
                        client.huntingManager.attack.tryAttackTarget();
                    }
                }
            }
        });

        client.huntingManager.echo('Loaded.');
    }
);
