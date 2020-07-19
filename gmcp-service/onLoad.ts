import { FunctionItem } from '../source';
import { DisplayServiceClient } from 'display-service/display-service';
import { SystemServiceClient } from 'system-service/system-service';
import { GMCPServiceClient, GMCPSubscription, GMCPSubscriber, GMCPServiceRoom, GMCPService, GMCPServiceRift, GMCPLatest, GMCPServiceItems } from './gmcp-service';

declare const client: GMCPServiceClient & DisplayServiceClient & SystemServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        class _GMCPService extends client.systemService.BasePackage implements GMCPService {
            public latest: GMCPLatest = {};
            public subscriptions: GMCPSubscription<GMCPServerMethod>[] = [];

            public vitals: GMCPCharVitals = <GMCPCharVitals>{};
            public previousVitals: GMCPCharVitals = <GMCPCharVitals>{};

            public status: GMCPCharStatus = {};
            public previousStatus: GMCPCharStatus = {};

            public room: GMCPServiceRoom = <GMCPServiceRoom>{};
            public previousRoom: GMCPServiceRoom = <GMCPServiceRoom>{};

            public items: GMCPServiceItems = {
                inv: [],
                room: []
            };

            public previousItems: GMCPServiceItems = {
                inv: [],
                room: []
            };

            public defences: GMCPCharDefencesDefence[] = [];
            public previousDefences: GMCPCharDefencesDefence[] = [];

            public afflictions: GMCPCharAfflictionsAffliction[] = [];
            public previousAfflictions: GMCPCharAfflictionsAffliction[] = [];

            public rift: GMCPServiceRift = {};
            public previousRift: GMCPServiceRift = {};

            public constructor () {
                super(
                    'GMCP Service',
                    'gmcp-service:settings',
                    {}
                );

                send_GMCP('Char.Items.Inv');
                send_GMCP('Char.Items.Room');
                send_GMCP('IRE.Rift.Request');

                this.systemService.sendCommand('quicklook');
                this.systemService.sendCommand('score');

                this.echo('Loaded.');
            }

            public subscribe<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>) {
                const subscription = {
                    methods,
                    subscriber
                };

                client.gmcpService.subscriptions.push(<GMCPSubscription<GMCPServerMethod>><unknown>subscription);

                return subscription;
            }

            public unsubscribe(subscription: GMCPSubscription<GMCPServerMethod>) {
                const index = client.gmcpService.subscriptions.findIndex(value => value === subscription);

                client.gmcpService.subscriptions.splice(index, 1);
            }

            public once<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>) {
                const subscription = client.gmcpService.subscribe(methods, function (args) {
                    subscriber(args);

                    client.gmcpService.unsubscribe(<GMCPSubscription<GMCPServerMethod>><unknown>subscription);
                });

                return subscription;
            }
        };

        client.gmcpService = new _GMCPService();
    }
);
