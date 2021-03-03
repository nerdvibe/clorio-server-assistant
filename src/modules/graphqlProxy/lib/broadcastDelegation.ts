import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";
import {SendDeleagationInput, SignatureInput} from "@modules/transactions/graphql/mutations";

const log = logger("GQL_PROXY_BROADCAST");

export const broadcastDelegation = async (signature: SignatureInput, input: SendDeleagationInput) => {
  try {
    const {data} = await minaNodeClient.mutate({
      mutation: gql`
        mutation sendDelegation($signature: SignatureInput, $input: SendDelegationInput!) {
          sendDelegation(signature: $signature, input: $input) {
            delegation {
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

    if(!data?.sendDelegation?.delegation?.id) {
      throw new Error('Broadcast failed');
    }

    return data.sendDelegation.delegation
  } catch (e) {
    log.error(e);
  }
};
