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
    queuesToSend: Set<QueueManagerQueueType>;
    subscriptions: QueueManagerQueueSubscription<QueueManagerQueueType>[];
    echo(message: string): void;
    error(text: string): void;
    subscribe<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>): QueueManagerQueueSubscription<TQueueType>;
    unsubscribe(subscription: QueueManagerQueueSubscription<QueueManagerQueueType>): void;
    once<TQueueType extends QueueManagerQueueType>(queues: TQueueType[], subscriber: QueueManagerQueueSubscriber<TQueueType>): QueueManagerQueueSubscription<TQueueType>;
    emit(queueType: QueueManagerQueueType, method: QueueManagerQueueMethod, args: QueueManagerSubscriberArgs): void;
    parseCommand(queueType: QueueManagerQueueType, command: string): QueueManagerQueuedCommand[];
    noraliseQueueType(queueType: string): QueueManagerQueueType | undefined;
    getQueue(queueType: QueueManagerQueueType): QueueManagerQueuedCommand[];
    appendCommand(command: string, requires?: QueueManagerQueueType, consumes?: QueueManagerQueueType): QueueManagerQueuedCommand;
    prependCommand(command: string, requires?: QueueManagerQueueType, consumes?: QueueManagerQueueType): QueueManagerQueuedCommand;
    // replaceCommand(queueType: QueueManagerQueueType, index: number, command: string, requires?: QueueManagerQueueTypeInteractions, consumes?: QueueManagerQueueTypeInteractions): QueueManagerQueuedCommand;
    // insertCommand(queueType: QueueManagerQueueType, index: number, command: string, requires?: QueueManagerQueueTypeInteractions, consumes?: QueueManagerQueueTypeInteractions): QueueManagerQueuedCommand;
    removeCommand(queueType: QueueManagerQueueType, index: number): void;
    clearQueue(queueType: QueueManagerQueueType): void;
    sendQueue(queueType: QueueManagerQueueType): void;
}

export type QueueManagerClient = typeof client & {
    queueManager: QueueManager;
};
