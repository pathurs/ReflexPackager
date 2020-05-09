import { FunctionItem } from '../source';
import { QueueServiceClient, QueueSubscriber, QueueType, QueueSubscription } from './queue-service';
import { DisplayServiceClient } from '../display-service/display-service';

declare const client: QueueServiceClient & DisplayServiceClient;

export const onLoad = new FunctionItem(
    'onLoad',
    function () {
        client.queueservice = {
            enabled: true,
            gag: true,
            balanceQueue: [],
            equilibriumQueue: [],
            equilibriumBalanceQueue: [],
            classQueue: [],
            shipQueue: [],
            subscriptions: [],
            subscribe<TQueueType extends QueueType>(queues: TQueueType[], subscriber: QueueSubscriber<TQueueType>) {
                const subscription = {
                    queues,
                    subscriber
                };

                client.queueservice.subscriptions.push(<QueueSubscription<QueueType>><unknown>subscription);

                return subscription;
            },
            unsubscribe(subscription) {
                const index = client.queueservice.subscriptions.findIndex(value => value === subscription);

                client.queueservice.subscriptions.splice(index, 1);
            },
            once<TQueueType extends QueueType>(queues: TQueueType[], subscriber: QueueSubscriber<TQueueType>) {
                const subscription = client.queueservice.subscribe(queues, function (queue, method, commands) {
                    subscriber(queue, method, commands);

                    client.queueservice.unsubscribe(<QueueSubscription<QueueType>><unknown>subscription);
                });

                return subscription;
            },
            echo(text) {
                client.displayservice.echo(`%lightgray%[%deepskyblue%Queue Service%end%]:%end% ${text}`);
            },
            error(text) {
                client.queueservice.echo(`%red%${text}`);
            }
        };

        client.queueservice.echo('Loaded.');
    }
);
