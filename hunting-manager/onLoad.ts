import { FunctionItem } from '../source';
import { HuntingManagerClient } from './hunting-manager';
import { DisplayServiceClient } from '../display-service/display-service';
import { GMCPServiceClient } from '../gmcp-service/gmcp-service';
import { SystemServiceClient } from '../system-service/system-service';
import { QueueServiceClient, QueueSubscription, QueueType } from '../queue-service/queue-service'

declare const client: HuntingManagerClient & DisplayServiceClient & GMCPServiceClient & SystemServiceClient & QueueServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.huntingmanager = {
            running: false,
            settings: get_variable('hunting-manager:settings') || {
                enabled: true,
                warnAtPercent: 25,
                fleeAtPercent: 10,
                autoFlee: false,
                attackCommand: 'kill'
            },
            room: <GMCPRoomInfo>{},
            areas: get_variable('hunting-manager:areas') || {},
            roomMonsters: [],
            echo(text) {
                client.displayservice.echo(`%white%[%deepskyblue%Hunting Manager%end%]:%end% ${text}`);
            },
            error(text) {
                client.huntingmanager.echo(`%red%${text}`);
            },
            save() {
                client.systemservice.save('hunting-manager', () => {
                    set_variable('hunting-manager:areas', client.huntingmanager.areas);
                    set_variable('hunting-manager:settings', client.huntingmanager.settings);

                    client.huntingmanager.echo('Settings saved.');
                });
            },
            addArea(area: string) {
                if (client.huntingmanager.areas[area]) {
                    return;
                }

                client.huntingmanager.areas[area] = {
                    name: area,
                    monsters: []
                };

                client.huntingmanager.echo(`Add new area: '%white%${area}%end%'.`);

                client.huntingmanager.save();
            },
            addMonster(area: string, monster: string) {
                if (!client.huntingmanager.areas[area]) {
                    client.huntingmanager.addArea(area);
                }

                if (client.huntingmanager.areas[area].monsters.includes(monster)) {
                    return;
                }

                client.huntingmanager.areas[area].monsters.push(monster);

                client.huntingmanager.echo(`Add new monster '%white%${monster}%end%' to area '%white%${area}%end%'.`);

                client.huntingmanager.save();
            },
            onRoomChange(args: GMCPFunctionArgs<'Char.Items.List' | 'Char.Items.Add' | 'Char.Items.Remove' | 'Char.Items.Update'>): void {
                switch (args.gmcp_method) {
                    case 'Char.Items.List':
                        const monsters = new Set([
                            ...client.huntingmanager.roomMonsters.map(monster => monster.id),
                            ...(<GMCPCharItemsList>args.gmcp_args).items.filter(item => item.attrib?.includes('m')).map(monster => monster.id)
                        ]);

                        monsters.forEach(monsterId => {
                            const oldMonster = client.huntingmanager.roomMonsters.find(monster => monster.id === monsterId);
                            const newMonster = (<GMCPCharItemsList>args.gmcp_args).items.find(monster => monster.id === monsterId);

                            if (oldMonster && newMonster) {
                                updateMonster(oldMonster, newMonster);
                            }
                            else if (oldMonster) {
                                removeMonster(oldMonster);
                            }
                            else if (newMonster) {
                                addMonster(newMonster);
                            }
                            else {
                                throw new Error(`Hunting Manager(onRoomChange): Unknown item: '${monsterId}'`);
                            }
                        });
                        break;

                    case 'Char.Items.Add':
                        {
                            const monster = (<GMCPCharItemsAdd>args.gmcp_args).item;
                            const oldMonster = client.huntingmanager.roomMonsters.find(value => value.id === monster.id);

                            if (oldMonster) {
                                updateMonster(oldMonster, monster);
                            }
                            else {
                                addMonster(monster);
                            }
                        }
                        break;

                    case 'Char.Items.Remove':
                        {
                            const monster = (<GMCPCharItemsAdd>args.gmcp_args).item;
                            const oldMonster = client.huntingmanager.roomMonsters.find(value => value.id === monster.id);

                            if (oldMonster) {
                                removeMonster(monster);
                            }
                        }
                        break;

                    case 'Char.Items.Update':
                        {
                            const monster = (<GMCPCharItemsAdd>args.gmcp_args).item;
                            const oldMonster = client.huntingmanager.roomMonsters.find(value => value.id === monster.id);

                            if (oldMonster) {
                                updateMonster(oldMonster, monster);
                            }
                            else {
                                addMonster(monster);
                            }
                        }
                        break;
                }

                function addMonster(monster: GMCPCharItemsItem) {
                    client.huntingmanager.roomMonsters.push(monster);
                }

                function removeMonster(monster: GMCPCharItemsItem) {
                    const index = client.huntingmanager.roomMonsters.findIndex(value => value.id === monster.id);

                    client.huntingmanager.roomMonsters.splice(index, 1);

                    if (client.huntingmanager.currentTarget && client.huntingmanager.currentTarget.id === monster.id) {
                        client.huntingmanager.tryTargetNext();
                    }
                }

                function updateMonster(_oldMonster: GMCPCharItemsItem, newMonster: GMCPCharItemsItem) {
                    const index = client.huntingmanager.roomMonsters.findIndex(value => value.id === newMonster.id);

                    client.huntingmanager.roomMonsters[index] = newMonster;

                    if (client.huntingmanager.currentTarget && client.huntingmanager.currentTarget.id === newMonster.id) {
                        if (newMonster.attrib?.includes('d')) {
                            client.huntingmanager.tryTargetNext();
                        }
                        else {
                            client.huntingmanager.currentTarget = newMonster;
                        }
                    }
                }
            },
            start() {
                if (client.huntingmanager.running) {
                    return;
                }

                client.huntingmanager.tryTargetNext();

                if (client.huntingmanager.currentTarget) {
                    client.huntingmanager.running = true;

                    client.huntingmanager.queueSubscription = client.queueservice.subscribe(['bal', 'eq', 'eqbal'], (_queue, method, args) => {
                        if (method === 'run' && args.command.toLowerCase().startsWith(client.huntingmanager.settings.attackCommand.toLowerCase())) {
                            client.huntingmanager.tryAttack();
                        }
                    });

                    client.huntingmanager.tryAttack();

                    client.huntingmanager.echo('Started hunting.');
                }
                else {
                    client.huntingmanager.error('Cannot start hunting. No targets found.');
                }
            },
            stop() {
                if (!client.huntingmanager.running) {
                    return;
                }

                client.huntingmanager.running = false;

                client.huntingmanager.echo('Stopped hunting.');

                if (client.huntingmanager.queueSubscription) {
                    client.queueservice.unsubscribe(<QueueSubscription<QueueType>>client.huntingmanager.queueSubscription);
                }
            },
            findTarget() {
                if (!client.huntingmanager.areas[client.huntingmanager.room.area]) {
                    return;
                }

                for (const areaMonsterName of client.huntingmanager.areas[client.huntingmanager.room.area].monsters) {
                    for (const roomMonster of client.huntingmanager.roomMonsters) {
                        if (roomMonster.name === areaMonsterName) {
                            return roomMonster;
                        }
                    }
                }

                return undefined;
            },
            target(target) {
                client.huntingmanager.currentTarget = target;

                if (!client.huntingmanager.currentTarget) {
                    client.huntingmanager.stop();

                    return;
                }

                GMCP.Target = client.huntingmanager.currentTarget.id;

                set_variable('tar', client.huntingmanager.currentTarget.id);

                set_current_target_info(client.huntingmanager.currentTarget.name, '100%', undefined);

                send_GMCP('IRE.Target.Set', client.huntingmanager.currentTarget.id);

                client.huntingmanager.echo(`Targetting %white%${client.huntingmanager.currentTarget.name}%end% (%white%${client.huntingmanager.currentTarget.id}%end%)`);

            },
            tryTargetNext() {
                client.huntingmanager.target(client.huntingmanager.findTarget());
            },
            attack() {
                if (!client.huntingmanager.currentTarget) {
                    client.huntingmanager.error('Cannot attack. No target set.');
                    client.huntingmanager.stop();

                    return;
                }

                send_command(`queue add eqbal ${client.huntingmanager.settings.attackCommand} ${client.huntingmanager.currentTarget.id}`, 1);

                client.huntingmanager.echo(`Attacking %white%${client.huntingmanager.currentTarget.name}%end% (%white%${client.huntingmanager.currentTarget.id}%end%)`);
            },
            tryAttack() {
                if (client.huntingmanager.currentTarget) {
                    client.huntingmanager.attack();
                }
            },
            raze() {
                if (!client.huntingmanager.settings.razeCommand) {
                    client.huntingmanager.error('Cannot raze. No raze command set.');

                    return;
                }

                if (!client.huntingmanager.currentTarget) {
                    client.huntingmanager.error('Cannot raze. No target set.');
                    client.huntingmanager.stop();

                    return;
                }

                send_command(`queue prepend eqbal ${client.huntingmanager.settings.razeCommand}`, 1);

                client.huntingmanager.echo(`Razing %white%${client.huntingmanager.currentTarget.name}%end% (%white%${client.huntingmanager.currentTarget.id}%end%)`);
            },
            tryRaze() {
                if (client.huntingmanager.settings.razeCommand && client.huntingmanager.currentTarget) {
                    client.huntingmanager.raze();
                }
            },
            shield() {
                if (!client.huntingmanager.settings.shieldCommand) {
                    client.huntingmanager.error('Cannot shield. No shield command set.');

                    return;
                }

                send_command(`queue addclear eqbal ${client.huntingmanager.settings.shieldCommand}`, 1);

                client.huntingmanager.echo(`Shielding.`);
            },
            tryShield() {
                if (client.huntingmanager.settings.shieldCommand) {
                    client.huntingmanager.shield();
                }
            }
        };

        client.gmcpservice.subscribe(['Char.Items.List', 'Char.Items.Add', 'Char.Items.Remove', 'Char.Items.Update'], args => {
            if (args.gmcp_args.location === 'room') {
                client.huntingmanager.onRoomChange(args);
            }
        });

        client.gmcpservice.subscribe(['Room.Info'], args => {
            client.huntingmanager.room = args.gmcp_args;
        });

        client.gmcpservice.subscribe(['IRE.Target.Set'], args => {
            if (!args.gmcp_args && !client.huntingmanager.currentTarget) {
                client.huntingmanager.tryTargetNext();

                return;
            }

            // const target = client.huntingmanager.roomMonsters.find(monster => monster.id === args.gmcp_args);

            // if (target) {
            //     client.huntingmanager.target(target);
            // }
            // else {
            //     client.huntingmanager.error(`IRE.Target.Set sent invalid target '${args.gmcp_args}'.`);
            // }
        });

        // client.gmcpservice.subscribe(['IRE.Target.Info'], args => {
        //     const target = client.huntingmanager.roomMonsters.find(monster => monster.id === args.gmcp_args.id);

        //     if (target) {
        //         client.huntingmanager.currentTarget = target;
        //     }
        //     else {
        //         client.huntingmanager.error(`IRE.Target.Info sent invalid target '${JSON.stringify(args.gmcp_args)}'.`);
        //     }
        // });

        send_GMCP('Char.Items.Room');

        send_command('quicklook', 1);

        client.huntingmanager.echo('Loaded.');
    }
);
