import { GroupItem } from '../../../../source';
import { Axe } from './Axe';
import { Hammerfist } from './Hammerfist';
import { Hook } from './Hook';
import { Moonkick } from './Moonkick';
import { Sidekick } from './Sidekick';
import { Snapkick } from './Snapkick';
import { Spear } from './Spear';
import { Uppercut } from './Uppercut';
import { Whirlwind } from './Whirlwind';

export const Triggers = new GroupItem(
    'Triggers',
    [
        Axe,
        Hammerfist,
        Hook,
        Moonkick,
        Sidekick,
        Snapkick,
        Spear,
        Uppercut,
        Whirlwind
    ]
);
