import { FunctionItem } from '../source';
import { GMCPServiceClient } from './gmcp-service';

declare const client: GMCPServiceClient;

export const onGMCP = new FunctionItem(
    'onGMCP',
    function (args: GMCPFunctionArgs) {
        (<unknown>client.gmcpservice.latest[args.gmcp_method]) = args.gmcp_args;

        // Vitals

        if (args.gmcp_method === 'Char.Vitals') {
            client.gmcpservice.previousVitals = deepCopy(client.gmcpservice.vitals);
            client.gmcpservice.vitals = args.gmcp_args;
        }

        // Room

        if (args.gmcp_method === 'Room.Info') {
            client.gmcpservice.previousRoom = deepCopy(client.gmcpservice.room);
            client.gmcpservice.room = args.gmcp_args;
        }

        // Items

        if (
            args.gmcp_method === 'Char.Items.List'
            || args.gmcp_method === 'Char.Items.Add'
            || args.gmcp_method === 'Char.Items.Remove'
            || args.gmcp_method === 'Char.Items.Update'
        ) {
            client.gmcpservice.previousItems = deepCopy({ ...client.gmcpservice.items });

            client.gmcpservice.items[args.gmcp_args.location] = client.gmcpservice.items[args.gmcp_args.location] || [];

            const items = <GMCPCharItemsItem[]>client.gmcpservice.items[args.gmcp_args.location];

            if (args.gmcp_method === 'Char.Items.List') {
                client.gmcpservice.items[args.gmcp_args.location] = args.gmcp_args.items;
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
            client.gmcpservice.previousDefences = deepCopy(client.gmcpservice.defences);

            if (args.gmcp_method === 'Char.Defences.List') {
                client.gmcpservice.defences = args.gmcp_args;
            }
            else if (args.gmcp_method === 'Char.Defences.Add') {
                client.gmcpservice.defences.push(args.gmcp_args);
            }
            else {
                args.gmcp_args.forEach(defence => {
                    const index = client.gmcpservice.defences.findIndex(value => value.name === defence);

                    if (index !== -1) {
                        client.gmcpservice.defences.splice(index, 1);
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
            client.gmcpservice.previousAfflictions = deepCopy(client.gmcpservice.afflictions);

            if (args.gmcp_method === 'Char.Afflictions.List') {
                client.gmcpservice.afflictions = args.gmcp_args;
            }
            else if (args.gmcp_method === 'Char.Afflictions.Add') {
                client.gmcpservice.afflictions.push(args.gmcp_args);
            }
            else {
                args.gmcp_args.forEach(affliction => {
                    const index = client.gmcpservice.afflictions.findIndex(value => value.name === affliction);

                    if (index !== -1) {
                        client.gmcpservice.afflictions.splice(index, 1);
                    }
                });
            }
        }

        // Rift

        if (args.gmcp_method === 'IRE.Rift.List' || args.gmcp_method === 'IRE.Rift.Change') {
            client.gmcpservice.previousRift = deepCopy(client.gmcpservice.rift);

            if (args.gmcp_method === 'IRE.Rift.List') {
                client.gmcpservice.rift = {};

                args.gmcp_args.forEach(value => {
                    const id = getRiftItemId(value);

                    client.gmcpservice.rift[id] = { id, ...value };
                });
            }
            else {
                const id = getRiftItemId(args.gmcp_args);

                client.gmcpservice.rift[id] = { id, ...args.gmcp_args };
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
        client.gmcpservice.subscriptions.forEach(subscription => {
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
