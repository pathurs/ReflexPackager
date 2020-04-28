import { GroupItem } from '../../source';
import { reportProfits } from './report-profits';
import { reportPurchase } from './report-purchase';
import { reportRead } from './report-read';

export const Triggers = new GroupItem(
    'Triggers',
    [
        reportProfits,
        reportPurchase,
        reportRead
    ]
);
