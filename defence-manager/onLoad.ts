import { FunctionItem } from '../source';
import { DefenceManagerClient } from './defence-manager';
import { GMCPServiceClient } from '../gmcp-service/gmcp-service';
import { DisplayServiceClient } from '../display-service/display-service';

declare const client: DefenceManagerClient & GMCPServiceClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.defencemanager = {
            defences: {
                nightsight: {
                    name: 'nightsight',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'nightsight',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax nightsight',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                vigilance: {
                    name: 'vigilance',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'vigilance',
                                causesBalance: false,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax vigilance',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                treewatch: {
                    name: 'treewatch',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'treewatch',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax treewatch',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                deathsight: {
                    name: 'deathsight',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'deathsight',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax deathsight',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                skywatch: {
                    name: 'skywatch',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'skywatch',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax skywatch',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                groundwatch: {
                    name: 'groundwatch',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'groundwatch',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax groundwatch',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                hypersight: {
                    name: 'hypersight',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'hypersight',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax hypersight',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                thirdeye: {
                    name: 'thirdeye',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'thirdeye',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                telesense: {
                    name: 'telesense',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'telesense',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax telesense',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                softfocus: {
                    name: 'softfocusing',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'vision',
                            activate: {
                                command: 'softfocus',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax softfocus',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                firefly: {
                    name: '',
                    type: 'timed',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch firefly',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                moss: {
                    name: 'mosstattoo',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch moss',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                shield: {
                    name: 'shield',
                    type: 'temporary',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch shield',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                mindseye: {
                    name: 'mindseye',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch mindseye',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                cloak: {
                    name: 'cloak',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch cloak',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                bell: {
                    name: '',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch bell',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                moon: {
                    name: 'moontattoo',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch moon',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                starburst: {
                    name: '',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch starburst',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                boar: {
                    name: 'boartattoo',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch boar',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                megalith: {
                    name: 'megalithtattoo',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch megalith',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                ox: {
                    name: 'oxtattoo',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch ox',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                chameleon: {
                    name: '',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'tattoos',
                            activate: {
                                command: 'touch chameleon @tar',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'touch chameleon @self',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                selfishness: {
                    name: 'selfishness',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'survival',
                            activate: {
                                command: 'selfishness',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'generosity',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                metawake: {
                    name: 'metawake',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'survival',
                            activate: {
                                command: 'metawake',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax metawake',
                                causesBalance: false,
                                needsBalance: false
                            },
                        }
                    ]
                },
                insomnia: {
                    name: 'insomnia',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'survival',
                            activate: {
                                command: 'insomnia',
                                causesBalance: false,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'relax insomnia',
                                causesBalance: false,
                                needsBalance: true
                            }
                        }
                    ]
                },
                clinging: {
                    name: 'clinging',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'survival',
                            activate: {
                                command: 'clinging',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                breathing: {
                    name: 'heldbreath',
                    type: 'temporary',
                    skills: [
                        {
                            skill: 'survival',
                            activate: {
                                command: 'hold breath',
                                causesBalance: true,
                                needsBalance: false
                            },
                            deactivate: {
                                command: 'release',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                curseward: {
                    name: 'curseward',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'survival',
                            activate: {
                                command: 'curseward',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                parry: {
                    name: 'parrying \((\w+)\)',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'weaponry',
                            activate: {
                                command: 'parry @tar',
                                causesBalance: false,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'parry nothing',
                                causesBalance: false,
                                needsBalance: true
                            }
                        }
                    ]
                },
                mount: {
                    name: '',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'riding',
                            activate: {
                                command: 'mount @mount',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'dismount',
                                causesBalance: false,
                                needsBalance: true
                            }
                        }
                    ]
                },
                prismatic: {
                    name: 'prismatic',
                    type: 'temporary',
                    skills: [
                        {
                            skill: 'items',
                            activate: {
                                command: 'strum lyre',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                slipperiness: {
                    name: 'slippery',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'pranks',
                            activate: {
                                command: 'slipperiness',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                balancing: {
                    name: 'balancing',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'pranks',
                            activate: {
                                command: 'balancing',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax balancing',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                acrobatics: {
                    name: 'acrobatics',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'pranks',
                            activate: {
                                command: 'acrobatics',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax acrobatics',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                arrowcatch: {
                    name: 'arrowcatching',
                    type: 'draining',
                    skills: [
                        {
                            skill: 'pranks',
                            activate: {
                                command: 'arrowcatch',
                                causesBalance: true,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax arrowcatch',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                },
                sun: {
                    name: '',
                    type: 'room',
                    skills: [
                        {
                            skill: 'tarot',
                            activate: {
                                command: 'outd sun|fling sun at ground',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                devil: {
                    name: '',
                    type: 'temporary',
                    skills: [
                        {
                            skill: 'tarot',
                            activate: {
                                command: 'outd devil|fling devil at ground',
                                causesBalance: true,
                                needsBalance: true
                            }
                        }
                    ]
                },
                gripping: {
                    name: 'gripping',
                    type: 'permanent',
                    skills: [
                        {
                            skill: 'puppetry',
                            activate: {
                                command: 'grip',
                                causesBalance: false,
                                needsBalance: true
                            },
                            deactivate: {
                                command: 'relax grip',
                                causesBalance: false,
                                needsBalance: false
                            }
                        }
                    ]
                }
            },
            currentDefenceIds: get_variable('defence-manager:current') || [],
            expectedDefenceIds: get_variable('defence-manager:expected') || [],
            echo(text) {
                client.displayservice.echo(`%white%[%reset%%deepskyblue%Defence Manager%reset%%white%]:%reset% ${text}`);
            },
            error(text) {
                client.defencemanager.echo(`%red%${text}`);
            }
        };

        client.gmcpservice.subscribe(['Char.Defences.List', 'Char.Defences.Add', 'Char.Defences.Remove'], args => {
            run_function('defence-manager:onDefenceChange', args, 'Defence Manager');
        });

        client.defencemanager.echo('Loaded.');
    }
);
