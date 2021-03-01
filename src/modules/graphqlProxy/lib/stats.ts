import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";

const log = logger("GQL_PROXY_STATS");

export const stats = async () => {
  try {
    const { data } = await minaNodeClient.query({
      query: gql`
          query daemonStatus {
              daemonStatus {
                  blockchainLength 
              }
          }
      `
    });

      return data?.daemonStatus?.blockchainLength || -1;
  } catch (e) {
      log.error(e);
  }
};
