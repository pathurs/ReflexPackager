import { FunctionItem } from '../source';
import { GMCPServiceClient, GMCPSubscription, GMCPSubscriber } from './gmcp-service';
import { DisplayServiceClient } from '../display-service/display-service';

declare const client: GMCPServiceClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
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
            },
            echo(text) {
                client.displayservice.echo(`%white%[%deepskyblue%GMCP Service%end%]:%end% ${text}`);
            },
            error(text) {
                client.gmcpservice.echo(`%red%${text}`);
            }
        };

        send_GMCP('Char.Items.Room');

        client.gmcpservice.echo('Loaded.');
    }
);
