import { FunctionItem } from '../source';
import { GMCPServiceClient } from './gmcp-service';

declare const client: GMCPServiceClient;

export const onGMCP = new FunctionItem(
    'onGMCP',
    function (args: GMCPFunctionArgs) {
        (<unknown>client.gmcpService.latest[args.gmcp_method]) = args.gmcp_args;

        // Vitals

        if (args.gmcp_method === 'Char.Vitals') {
            client.gmcpService.previousVitals = deepCopy(client.gmcpService.vitals);
            client.gmcpService.vitals = args.gmcp_args;
        }

        // Room

        if (args.gmcp_method === 'Room.Info') {
            client.gmcpService.previousRoom = deepCopy(client.gmcpService.room);
            client.gmcpService.room = args.gmcp_args;
        }

        // Items

        if (
            args.gmcp_method === 'Char.Items.List'
            || args.gmcp_method === 'Char.Items.Add'
            || args.gmcp_method === 'Char.Items.Remove'
            || args.gmcp_method === 'Char.Items.Update'
        ) {
            client.gmcpService.previousItems = deepCopy({ ...client.gmcpService.items });

            client.gmcpService.items[args.gmcp_args.location] = client.gmcpService.items[args.gmcp_args.location] || [];

            const items = <GMCPCharItemsItem[]>client.gmcpService.items[args.gmcp_args.location];

            if (args.gmcp_method === 'Char.Items.List') {
                client.gmcpService.items[args.gmcp_args.location] = args.gmcp_args.items;
            }
            else if (args.gmcp_method === 'Char.Items.Add') {
                items.push(args.gmcp_args.item);
            }
            else if (args.gmcp_method === 'Char.Items.Remove') {
                const index = items.findIndex(value => value.id === args.gmcp_args.item.id);

                if (index !== -1) {
                    items.splice(index, 1);
                }
            }
            else {
                const index = items.findIndex(value => value.id === args.gmcp_args.item.id);

                if (index !== -1) {
                    items.splice(index, 1, args.gmcp_args.item);
                }
            }
        }

        // Defences

        if (
            args.gmcp_method === 'Char.Defences.List'
            || args.gmcp_method === 'Char.Defences.Add'
            || args.gmcp_method === 'Char.Defences.Remove'
        ) {
            client.gmcpService.previousDefences = deepCopy(client.gmcpService.defences);

            if (args.gmcp_method === 'Char.Defences.List') {
                client.gmcpService.defences = args.gmcp_args;
            }
            else if (args.gmcp_method === 'Char.Defences.Add') {
                client.gmcpService.defences.push(args.gmcp_args);
            }
            else {
                args.gmcp_args.forEach(defence => {
                    const index = client.gmcpService.defences.findIndex(value => value.name === defence);

                    if (index !== -1) {
                        client.gmcpService.defences.splice(index, 1);
                    }
                });
            }
        }

        // Afflictions

        if (
            args.gmcp_method === 'Char.Afflictions.List'
            || args.gmcp_method === 'Char.Afflictions.Add'
            || args.gmcp_method === 'Char.Afflictions.Remove'
        ) {
            client.gmcpService.previousAfflictions = deepCopy(client.gmcpService.afflictions);

            if (args.gmcp_method === 'Char.Afflictions.List') {
                client.gmcpService.afflictions = args.gmcp_args;
            }
            else if (args.gmcp_method === 'Char.Afflictions.Add') {
                client.gmcpService.afflictions.push(args.gmcp_args);
            }
            else {
                args.gmcp_args.forEach(affliction => {
                    const index = client.gmcpService.afflictions.findIndex(value => value.name === affliction);

                    if (index !== -1) {
                        client.gmcpService.afflictions.splice(index, 1);
                    }
                });
            }
        }

        // Rift

        if (args.gmcp_method === 'IRE.Rift.List' || args.gmcp_method === 'IRE.Rift.Change') {
            client.gmcpService.previousRift = deepCopy(client.gmcpService.rift);

            if (args.gmcp_method === 'IRE.Rift.List') {
                client.gmcpService.rift = {};

                args.gmcp_args.forEach(value => {
                    const id = getRiftItemId(value);

                    client.gmcpService.rift[id] = { id, ...value };
                });
            }
            else {
                const id = getRiftItemId(args.gmcp_args);

                client.gmcpService.rift[id] = { id, ...args.gmcp_args };
            }

            function getRiftItemId(item: GMCPRiftItem): string {
                switch (item.name) {
                    case 'moss':
                        return 'irid';

                    case 'lumic moss':
                        return 'lumic';

                    case 'gold':
                        return 'agold';

                    default:
                        return item.name.replace(/\s+/, '');
                }
            }
        }

        // setTimeout(() => {
        client.gmcpService.subscriptions.forEach(subscription => {
            subscription.methods.forEach(method => {
                if (args.gmcp_method.includes(method)) {
                    subscription.subscriber(args);
                }
            });
        });
        // });

        function deepCopy<T>(object: T): T {
            return JSON.parse(JSON.stringify(object));
        }
    }
);
