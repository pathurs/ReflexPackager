import { FunctionItem } from '../source';
import { GMCPServiceClient } from './gmcp-service';

declare const client: GMCPServiceClient;

export const onGMCP = new FunctionItem(
    'onGMCP',
    function (args: GMCPFunctionArgs) {
        (<unknown>client.gmcpservice.latest[args.gmcp_method]) = args.gmcp_args;

        client.gmcpservice.subscriptions.forEach(subscription => {
            subscription.methods.forEach(method => {
                if (args.gmcp_method.includes(method)) {
                    subscription.subscriber(args);
                }
            });
        });
    }
);
