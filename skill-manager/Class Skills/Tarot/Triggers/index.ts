import { GroupItem } from '../../../../source';
import { inscribeFailed } from './inscribe-failed';
import { inscribed } from './inscribed';
import { inscribing } from './inscribing';

export const Triggers = new GroupItem(
    'Triggers',
    [
        inscribeFailed,
        inscribed,
        inscribing
    ]
);
