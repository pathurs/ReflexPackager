type GMCPLatest = Partial<GMCPServerMethodToArgsMap>;

type GMCPSubscriber<TMethod extends GMCPServerMethod> = (args: GMCPFunctionArgs<TMethod>) => void;

interface GMCPSubscription<TMethod extends GMCPServerMethod> {
    methods: TMethod[];
    subscriber: GMCPSubscriber<TMethod>;
}

interface GMCPService {
    latest: GMCPLatest;
    subscriptions: GMCPSubscription<GMCPServerMethod>[];
    subscribe<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>): GMCPSubscription<TMethod>;
    unsubscribe(subscriber: GMCPSubscription<GMCPServerMethod>): void;
    once<TMethod extends GMCPServerMethod>(methods: TMethod[], subscriber: GMCPSubscriber<TMethod>): GMCPSubscription<TMethod>;
}

export type GMCPServiceClient = typeof client & {
    gmcpservice: GMCPService;
};
