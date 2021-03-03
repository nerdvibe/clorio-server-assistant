import {mempool} from "@modules/graphqlProxy/lib/mempool";

export interface MempoolQueryArgs {
    publicKey: string
}

export const queries = {
    mempool: ({publicKey}: MempoolQueryArgs) => {
        return mempool(publicKey);
    },
};
