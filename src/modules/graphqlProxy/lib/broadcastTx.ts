import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";

const log = logger("GQL_PROXY_BROADCAST");

// TODO PARAMS
export const broadcastTx = async () => {
  try {
    const response = minaNodeClient.mutate({
      mutation: gql`
        mutation popJob {
          popJob {
            id
            type
            param
            status
            progress
            creation_date
            expiration_date
          }
        }
      `,
    });
  } catch (e) {
    log.error(e);
  }
};
