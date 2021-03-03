import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";
import {SendPaymentInput, SignatureInput} from "@modules/transactions/graphql/mutations";

const log = logger("GQL_PROXY_BROADCAST");

export const broadcastTx = async (signature: SignatureInput, input: SendPaymentInput) => {
  try {
    const {data} = await minaNodeClient.mutate({
      mutation: gql`
        mutation sendPayment($signature: SignatureInput, $input: SendPaymentInput!) {
          sendPayment(signature: $signature, input: $input) {
            payment {
              id
            } 
          }
        }
      `,
      variables: {
        signature,
        input
      }
    });

    if(!data?.sendPayment?.payment?.id) {
      throw new Error('Broadcast failed');
    }

    return data.sendPayment.payment
  } catch (e) {
    log.error(e);
  }
};
