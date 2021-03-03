import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";

const log = logger("GQL_PROXY_MEMPOOL");

export const mempool = async (publicKey: string) => {
  try {
    const { data } = await minaNodeClient.query({
      query: gql`
          query mempool($publicKey: String) {
              pooledUserCommands(publicKey: $publicKey) {
                  id
                  fee
                  feeToken
                  kind
                  amount
                  nonce
                  source {publicKey}
                  receiver {publicKey}
              }
          }
      `,
        variables: {
            publicKey,
        },
        fetchPolicy: "no-cache"
    });

      return data.pooledUserCommands || [];
  } catch (e) {
      log.error(e);
  }
};
