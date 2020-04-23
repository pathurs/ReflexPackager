type QueueType = 'bal' | 'eq' | 'eqbal' | 'class' | 'ship';
type SafeQueueType = QueueType | 'balance' | 'equilibrium' | 'equilibriumbalance';

type QueueMethod = 'add' | 'remove' | 'prepend' | 'replace' | 'insert' | 'clear' | 'run';

type QueueSubscriber<TQueueType extends QueueType> = (queue: TQueueType, method: QueueMethod, args: { index: number; command: string; }) => void;

interface QueueSubscription<TQueueType extends QueueType> {
    queues: TQueueType[];
    subscriber: QueueSubscriber<TQueueType>;
}

interface QueueService {
    enabled: boolean;
    gag: boolean;
    balanceQueue: string[];
    equilibriumQueue: string[];
    equilibriumBalanceQueue: string[];
    classQueue: string[];
    shipQueue: string[];
    subscriptions: QueueSubscription<QueueType>[];
    echo(message: string): void;
    error(text: string): void;
    subscribe<TQueueType extends QueueType>(queues: TQueueType[], subscriber: QueueSubscriber<TQueueType>): QueueSubscription<TQueueType>;
    unsubscribe(subscription: QueueSubscription<QueueType>): void;
    once<TQueueType extends QueueType>(queues: TQueueType[], subscriber: QueueSubscriber<TQueueType>): QueueSubscription<TQueueType>;
}

export type QueueServiceClient = typeof client & {
    queueservice: QueueService;
};
