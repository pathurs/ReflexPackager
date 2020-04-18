import { GroupItem } from '../../source';
import { checkMissingItem } from './check-missing-item';
import { gatheredExtra } from './gathered-extra';
import { butchered } from './butchered';
import { cantButcher } from './cant-butcher';
import { cantExtract } from './cant-extract';
import { cantGather } from './cant-gather';
import { cantHarvest } from './cant-harvest';
import { extracted } from './extracted';
import { harvested } from './harvested';
import { gathered } from './gathered';
import { harvestedSac } from './harvested-sac';
import { harvestedSkin } from './harvested-skin';
import { systemQueueAdd } from './system-queue-add';
import { systemQueueRemove } from './system-queue-remove';
import { millFailed } from './mill-failed';
import { milled } from './milled';

export const Triggers = new GroupItem(
    'Triggers',
    [
        butchered,
        cantButcher,
        cantExtract,
        cantGather,
        cantHarvest,
        checkMissingItem, // Temporary
        extracted,
        gathered,
        gatheredExtra,
        harvested,
        harvestedSac,
        harvestedSkin,
        millFailed,
        milled,
        systemQueueAdd,
        systemQueueRemove
    ]
);
