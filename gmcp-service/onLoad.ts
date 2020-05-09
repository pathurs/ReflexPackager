import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient, GMCPSubscription, GMCPSubscriber, GMCPServiceRoom } from './gmcp-service';

declare const client: GMCPServiceClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {

        client.gmcpservice = {
            latest: {},
            subscriptions: [],
            vitals: <GMCPCharVitals>{},
            previousVitals: <GMCPCharVitals>{},
            room: <GMCPServiceRoom>{},
            previousRoom: <GMCPServiceRoom>{},
            items: {
                inv: [],
                room: []
            },
            previousItems: {
                inv: [],
                room: []
            },
            defences: [],
            previousDefences: [],
            afflictions: [],
            previousAfflictions: [],
            rift: {},
            previousRift: {},
            subscribe<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>) {
                const subscription = {
                    methods,
                    subscriber
                };

                client.gmcpservice.subscriptions.push(<GMCPSubscription<GMCPServerMethod>><unknown>subscription);

                return subscription;
            },
            unsubscribe(subscription) {
                const index = client.gmcpservice.subscriptions.findIndex(value => value === subscription);

                client.gmcpservice.subscriptions.splice(index, 1);
            },
            once<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>) {
                const subscription = client.gmcpservice.subscribe(methods, function (args) {
                    subscriber(args);

                    client.gmcpservice.unsubscribe(<GMCPSubscription<GMCPServerMethod>><unknown>subscription);
                });

                return subscription;
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%GMCP Service%end%]:%end% ${text}`);
            },
            error(text) {
                client.gmcpservice.echo(`%red%${text}`);
            }
        };

        send_GMCP('Char.Items.Inv');
        send_GMCP('Char.Items.Room');
        send_GMCP('IRE.Rift.Request');

        client.systemservice.sendCommand('quicklook');

        client.gmcpservice.echo('Loaded.');
    }
);
