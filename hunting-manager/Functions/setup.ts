import { HuntingManagerClient } from '../hunting-manager';
import { FunctionItem } from '../../source';

declare const client: HuntingManagerClient;

export const setup = new FunctionItem(
    'hunting-manager:setup',
    function () {
        client.huntingmanager = {
            enabled: true,
            potentialTargets: []
        };
    }
);

