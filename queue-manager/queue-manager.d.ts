type QueueManagerQueueType = 'free' | 'balance' | 'equilibrium' | 'equilibriumBalance' | 'class' | 'ship';

type QueueManagerQueueMethod = 'add' | 'remove' | 'prepend' | 'replace' | 'insert' | 'clear' | 'run';

interface QueueManagerCommand {
    command: string;
    requires?: QueueManagerQueueType;
    consumes?: QueueManagerQueueType;
}

interface QueueManagerQueuedCommand extends QueueManagerCommand {
    queue: QueueManagerQueueType;
}

interface QueueManagerSubscriberArgs {
    queue: QueueManagerQueueType;
    commands: QueueManagerQueuedCommand[];
    index: number;
}

type QueueManagerQueueSubscriber<TQueueType extends QueueManagerQueueType> = (queue: TQueueType, method: QueueManagerQueueMethod, args: QueueManagerSubscriberArgs) => void;

interface QueueManagerQueueSubscription<TQueueType extends QueueManagerQueueType> {
    queues: TQueueType[];
    subscriber: QueueManagerQueueSubscriber<TQueueType>;
}

interface QueueManagerFree {
    // expected: QueueManagerQueuedCommand;
    queue: QueueManagerQueuedCommand[];
}

interface QueueManagerBalance {
    expected?: string;
    queue: QueueManagerQueuedCommand[];
}

interface QueueManagerEquilibrium {
    expected?: string;
    queue: QueueManagerQueuedCommand[];
}

interface QueueManagerEquilibriumBalance {
    expected?: string;
    queue: QueueManagerQueuedCommand[];
}

interface QueueManagerClass {
    expected?: string;
    queue: QueueManagerQueuedCommand[];
}

interface QueueManagerShip {
    expected?: string;
    queue: QueueManagerQueuedCommand[];
}

interface QueueManagerSettings {
    enabled: boolean;
    gag: boolean;
}

interface QueueManager {
    settings: QueueManagerSettings;
    free: QueueManagerFree;
    balance: QueueManagerBalance;
    equilibrium: QueueManagerEquilibrium;
    equilibriumBalance: QueueManagerEquilibriumBalance;
    class: QueueManagerClass;
    ship: QueueManagerShip;
    sendingQueue: boolean;
    subscriptions: QueueManagerQueueSubscription<QueueManagerQueueType>[];
    echo(message: string): void;
    error(text: string): void;
    subscribe<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>): QueueManagerQueueSubscription<TQueueType>;
    unsubscribe(subscription: QueueManagerQueueSubscription<QueueManagerQueueType>): void;
    once<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>): QueueManagerQueueSubscription<TQueueType>;
    emit(queueType: QueueManagerQueueType, method: QueueManagerQueueMethod, args: QueueManagerSubscriberArgs): void;
    parseCommand(queueType: QueueManagerQueueType, command: string): QueueManagerQueuedCommand[];
    noraliseQueueType(type: string): QueueManagerQueueType | undefined;
    getQueue(type: QueueManagerQueueType): QueueManagerQueuedCommand[];
    appendCommand(command: string, requires?: QueueManagerQueueType, consumes?: QueueManagerQueueType): QueueManagerQueuedCommand;
    prependCommand(command: string, requires?: QueueManagerQueueType, consumes?: QueueManagerQueueType): QueueManagerQueuedCommand;
    // replaceCommand(type: QueueManagerQueueType, index: number, command: string, requires?: QueueManagerQueueTypeInteractions, consumes?: QueueManagerQueueTypeInteractions): QueueManagerQueuedCommand;
    // insertCommand(type: QueueManagerQueueType, index: number, command: string, requires?: QueueManagerQueueTypeInteractions, consumes?: QueueManagerQueueTypeInteractions): QueueManagerQueuedCommand;
    removeCommand(type: QueueManagerQueueType, index: number): void;
    clearQueue(type: QueueManagerQueueType): void;
    sendQueue(type: QueueManagerQueueType): void;
}

export type QueueManagerClient = typeof client & {
    queuemanager: QueueManager;
};
