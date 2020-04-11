import { GMCPServiceClient, GMCPSubscription, GMCPSubscriber } from '../gmcp-service';
import { FunctionItem } from '../../source';

declare const client: GMCPServiceClient;

export const setup = new FunctionItem(
    'gmcp-service:setup',
    function () {
        client.gmcpservice = {
            latest: {},
            subscriptions: [],
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
            }
        };
    }
);

