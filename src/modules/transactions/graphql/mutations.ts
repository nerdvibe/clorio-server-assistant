import {broadcastTx} from "@modules/graphqlProxy";
import {broadcastDelegation} from "@modules/graphqlProxy/lib/broadcastDelegation";

export interface SignatureInput {
    rawSignature: string;
    scalar: string;
    field: string;
}

export interface SendPaymentInput {
    nonce: string;
    memo: string;
    validUntil: string;
    fee: string;
    amount: string;
    token: string;
    to: string;
    from: string;
}

export interface SendDeleagationInput {
    nonce: string;
    memo: string;
    validUntil: string;
    fee: string;
    to: string;
    from: string;
}

interface BroadcastTransaction {
    signature: SignatureInput;
    input: SendPaymentInput;
}
interface BroadcastDelegation {
    signature: SignatureInput;
    input: SendDeleagationInput;
}

export const mutations = {
    broadcastTransaction: ({signature, input}: BroadcastTransaction) => {
        return broadcastTx(signature, input);
    },

    broadcastDelegation: ({signature, input}: BroadcastDelegation) => {
        return broadcastDelegation(signature, input);
    },
};
