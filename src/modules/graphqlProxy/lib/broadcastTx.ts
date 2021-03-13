import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import {SendPaymentInput, SignatureInput} from "@modules/transactions/graphql/mutations";

export const broadcastTx = async (signature: SignatureInput, input: SendPaymentInput) => {
  const {data, errors} = await minaNodeClient.mutate({
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

  if(errors || !data?.sendPayment?.payment?.id) {
    throw new Error('Broadcast failed');
  }

  return data.sendPayment.payment
};
