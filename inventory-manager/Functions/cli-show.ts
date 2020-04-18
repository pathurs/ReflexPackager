import { FunctionItem } from '../../source';
import { InventoryManagerClient } from '../inventory-manager';
import { DisplayServiceClient } from '../../display-service/display-service';


declare const client: InventoryManagerClient & DisplayServiceClient;

export const cliShow = new FunctionItem(
    'inventory-manager:cli-show',
    function () {
        client.displayservice.table(
            'Inventory Manager',
            [
                {
                    title: undefined,
                    columns: 3,
                    items: [
                        {
                            label: 'Enabled',
                            value: 'Yes',
                            // hint: 'Whether to enable the Inventory Manager.'
                        },
                        {
                            label: 'Mode',
                            value: 'Default',
                            // hint: 'The current mode.'
                        },
                        {
                            label: 'Selfishness',
                            value: 'Yes',
                            // hint: 'Whether to use the selfishness defence.'
                        }
                    ]
                },
                {
                    title: 'Wielding / Unwielding',
                    columns: 3,
                    items: [
                        {
                            label: 'Enabled',
                            value: 'Yes',
                            // hint: 'Whether to manage wielding and unwielding.'
                        },
                        {
                            label: 'Gripping',
                            value: 'Yes',
                            // hint: 'Whether to use the gripping defence.'
                        }
                    ]
                },
                {
                    title: 'Wearables',
                    columns: 3,
                    items: [
                        {
                            label: 'Enabled',
                            value: 'Yes',
                            // hint: 'Whether to manage wearables.'
                        }
                    ]
                },
                {
                    title: 'Groupables',
                    columns: 3,
                    items: [
                        {
                            label: 'Enabled',
                            value: 'Yes',
                            // hint: 'Whether to manage groupables.'
                        }
                    ]
                },
                {
                    title: 'Containers',
                    columns: 3,
                    items: [
                        {
                            label: 'Enabled',
                            value: 'Yes',
                            // hint: 'Whether to manage containers.'
                        }
                    ]
                },
                {
                    title: 'Corpses',
                    columns: 3,
                    items: [
                        {
                            label: 'Enabled',
                            value: 'Yes',
                            // hint: 'Whether to manage corpses.'
                        }
                    ]
                }
            ]
        );
    }
);
