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
                            value: makeBooleanValue(
                                client.inventorymanager.settings.enabled,
                                'inventory-manager config enabled false',
                                'Disable Inventory Manager.',
                                'inventory-manager config enabled true',
                                'Enable Inventory Manager.'
                            )
                        },
                        {
                            label: 'Mode',
                            value: 'Default',
                            // hint: 'The current mode.'
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

        function makeBooleanValue(value: boolean, trueCommand: string, trueHint: string, falseCommand: string, falseHint: string) {
            return value
                ? client.displayservice.commandify('%lime%Yes', trueCommand, trueHint)
                : client.displayservice.commandify('%red%No', falseCommand, falseHint);
        }
    }
);
