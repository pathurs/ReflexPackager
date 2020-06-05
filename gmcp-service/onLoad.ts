import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient, GMCPSubscription, GMCPSubscriber, GMCPServiceRoom } from './gmcp-service';

declare const client: GMCPServiceClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {

        client.gmcpService = {
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

                client.gmcpService.subscriptions.push(<GMCPSubscription<GMCPServerMethod>><unknown>subscription);

                return subscription;
            },
            unsubscribe(subscription) {
                const index = client.gmcpService.subscriptions.findIndex(value => value === subscription);

                client.gmcpService.subscriptions.splice(index, 1);
            },
            once<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>) {
                const subscription = client.gmcpService.subscribe(methods, function (args) {
                    subscriber(args);

                    client.gmcpService.unsubscribe(<GMCPSubscription<GMCPServerMethod>><unknown>subscription);
                });

                return subscription;
            },
            echo(text) {
                client.displayService.echo(`%lightgray%[%deepskyblue%GMCP Service%end%]:%end% ${text}`);
            },
            error(text) {
                client.gmcpService.echo(`%red%${text}%end%`);
            }
        };

        send_GMCP('Char.Items.Inv');
        send_GMCP('Char.Items.Room');
        send_GMCP('IRE.Rift.Request');

        client.systemService.sendCommand('quicklook');

        client.gmcpService.echo('Loaded.');
    }
);
