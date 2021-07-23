import { GroupItem } from '../../source';
import { cityWho } from './city-who';
import { quickWho } from './quick-who';
import { honours } from './honours';
import { cityEnemies } from './city-enemies';

export const Triggers = new GroupItem(
    'Triggers',
    [
        cityEnemies,
        cityWho,
        honours,
        quickWho
    ]
);
